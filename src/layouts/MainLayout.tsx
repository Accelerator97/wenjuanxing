import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
const MainLayout: FC = () => {
  return (
    <>
      <div>Main Header</div>
      <div>
        <Outlet />
      </div>
      <div>Main Footer</div>
    </>
  );
};

export default MainLayout;
