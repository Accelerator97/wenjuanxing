import React, { FC, useState } from 'react';
import Styles from './List.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useSearchParams } from 'react-router-dom';
import { produce } from 'immer';

const rawList = [
  {
    id: '1',
    title: 'wenuan',
    isPublished: false,
    isStart: false,
    answerCount: 5,
    createdAt: '3月15日',
  },
  {
    id: '2',
    title: 'wenuan',
    isPublished: false,
    isStart: false,
    answerCount: 5,
    createdAt: '3月15日',
  },
  {
    id: '3',
    title: 'wenuan',
    isPublished: true,
    isStart: false,
    answerCount: 5,
    createdAt: '3月15日',
  },
  {
    id: '4',
    title: 'wenuan',
    isPublished: false,
    isStart: false,
    answerCount: 5,
    createdAt: '3月15日',
  },
];

const List: FC = () => {
  const [searchParams] = useSearchParams();
  const [questionList, setQuestionList] = useState(rawList);

  function add() {
    setQuestionList(
      produce(draft => {
        draft.push({
          isStart: false,
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
          <h3>我的问卷</h3>
        </div>
        <div className={Styles.right}>
          <h3>搜索</h3>
        </div>
      </div>
      <div className={Styles.content}>
        {questionList.map(item => {
          const { id } = item;
          return <QuestionCard key={id} {...item} editQuestion={edit} />;
        })}
      </div>
      <div className={Styles.footer}>footer</div>
    </>
  );
};

export default List;
