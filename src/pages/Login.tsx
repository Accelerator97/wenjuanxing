import React, { FC, useEffect } from 'react';
import { Typography, Spin, Empty, Space, Form, Input, Button, Checkbox, message } from 'antd';
import styles from './Register.module.scss';
import { UserAddOutlined } from '@ant-design/icons';
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getUserInfoService, loginService } from '../services/user';
import { setToken } from '../utils/user-token';
import { loginReducer } from '../store/userReducer';
import { useDispatch } from 'react-redux';

const { Title } = Typography;
const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}
const Login: FC = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);
  const { run } = useRequest(
    async (username: string, password: string) => {
      // todo 串行
      const data = await loginService(username, password);
      const info = await getUserInfoService();
      return { ...data, ...info };
    },
    {
      manual: true,
      onSuccess: result => {
        const { token = '', username, nickname } = result;
        setToken(token); // 存储 token
        message.success('登录成功');
        dispatch(loginReducer({ username, nickname })); // 存储到 redux store
        nav(MANAGE_INDEX_PATHNAME); // 导航到“我的问卷”
      },
    }
  );
  function onFinish(values: any) {
    const { username, password, remember } = values || {};
    run(username, password); // 执行 ajax
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
