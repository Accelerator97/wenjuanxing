import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useLoadUseData from '../hooks/useLoadUserData';
import { Spin } from 'antd';
import useNavPage from '../hooks/useNavPage';

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUseData();
  useNavPage(waitingUserData);
  return (
    <>
      <p>questionLayout</p>
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
