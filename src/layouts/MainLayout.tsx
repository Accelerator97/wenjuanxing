import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';

import { Layout } from 'antd';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
  return (
    <>
      <div className={styles.pageWrapper}>
        <Header className={styles.header}>
          <div className={styles.left}>
            <Logo />
          </div>
          <div className={styles.right}>
            <UserInfo></UserInfo>
          </div>
        </Header>
        <Content className={styles.main}>
          <Outlet />
        </Content>
        <Footer className={styles.footer}>问卷星 &copy;2025-present. Created By Ben</Footer>
      </div>
    </>
  );
};

export default MainLayout;
