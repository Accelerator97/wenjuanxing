import React, { ChangeEvent, FC, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Input, Space, Typography } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditToolbar from './EditToolbar';
import { changePageTitle } from '../../../store/pageInfoReducer';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
const { Title } = Typography;
// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();

  const [editState, SetEditState] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => SetEditState(false)}
        onBlur={() => SetEditState(false)}
      />
    );
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => SetEditState(true)} />
    </Space>
  );
};

const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            {/* <SaveButton />
            <PublishButton /> */}
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
