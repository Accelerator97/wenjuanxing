import React, { FC, useState } from 'react';
import Styles from './common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useSearchParams } from 'react-router-dom';
import { produce } from 'immer';
import { Typography, Spin, Empty } from 'antd';
import { useTitle } from 'ahooks';
import ListSearch from '../../components/ListSearch';

const rawList: any[] = [
  // {
  //   id: '1',
  //   title: 'wenuan',
  //   isPublished: false,
  //   isStar: false,
  //   answerCount: 5,
  //   createdAt: '3月15日',
  // },
  // {
  //   id: '2',
  //   title: 'wenuan',
  //   isPublished: false,
  //   isStar: false,
  //   answerCount: 5,
  //   createdAt: '3月15日',
  // },
  // {
  //   id: '3',
  //   title: 'wenuan',
  //   isPublished: true,
  //   isStar: false,
  //   answerCount: 5,
  //   createdAt: '3月15日',
  // },
  // {
  //   id: '4',
  //   title: 'wenuan',
  //   isPublished: false,
  //   isStar: false,
  //   answerCount: 5,
  //   createdAt: '3月15日',
  // },
];

const { Title } = Typography;

const List: FC = () => {
  useTitle('问卷星 - 我的问卷');
  const [searchParams] = useSearchParams();
  const [questionList, setQuestionList] = useState(rawList);

  function add() {
    setQuestionList(
      produce(draft => {
        draft.push({
          isStar: false,
          answerCount: 5,
          createdAt: '3月15日',
          id: Math.random() + '',
          title: 'wenuan',
          isPublished: false,
        });
      })
    );
  }

  function del(id: string) {
    setQuestionList(
      produce(draft => {
        const index = questionList.findIndex(r => r.id === id);
        draft.splice(index, 1);
      })
    );
  }

  function edit(id: string) {
    setQuestionList(
      produce(draft => {
        const index = questionList.findIndex(r => r.id === id);
        draft[index].isPublished = true;
      })
    );
  }

  return (
    <>
      <div className={Styles.header}>
        <div className={Styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={Styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={Styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 9 &&
          questionList.map(item => {
            const { id } = item;
            return <QuestionCard key={id} {...item} editQuestion={edit} />;
          })}
      </div>
      <div className={Styles.footer}>分页</div>
    </>
  );
};

export default List;
