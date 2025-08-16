import React, { FC, useEffect, useState } from 'react';
import Styles from './common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useSearchParams } from 'react-router-dom';
import { produce } from 'immer';
import { Typography, Spin, Empty } from 'antd';
import { useRequest, useTitle } from 'ahooks';
import ListSearch from '../../components/ListSearch';
import { getQuestionListService } from '../../services/question';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';

const { Title } = Typography;

const List: FC = () => {
  useTitle('问卷星 - 我的问卷');

  const { data = {}, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;
  function add() {
    //
  }

  function del(id: string) {
    //
  }

  function edit(id: string) {
    //
  }

  return (
    <>
      <div className={Styles.header}>
        <div className={Styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={Styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={Styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          list.length > 0 &&
          list.map((item: any) => {
            const { id } = item;
            return <QuestionCard key={id} {...item} editQuestion={edit} />;
          })}
      </div>
      <div className={Styles.footer}>加载更多...</div>
    </>
  );
};

export default List;
