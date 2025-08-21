import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useLoadUseData from '../hooks/useLoadUserData';
import { Spin } from 'antd';
import useNavPage from '../hooks/useNavPage';

const QuestionLayout: FC = () => {
  // 加载用户信息
  const { waitingUserData } = useLoadUseData();
  // 用户没有登陆时跳转到登陆页
  useNavPage(waitingUserData);
  return (
    <>
      <div>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};

export default QuestionLayout;
