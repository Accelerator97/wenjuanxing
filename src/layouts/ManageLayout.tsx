import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './ManageLayout.module.scss';

const MainLayout: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <p> Manager left</p>
          <button>创建问卷</button>
          <br />
          <a href="">我的问卷</a>
          <br />
          <a href="">星标问卷</a>
          <br />
          <a href="">回收站</a>
          <br />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
