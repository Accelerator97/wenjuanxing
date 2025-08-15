import React, { FC } from 'react';
import styles from './QuestionCard.module.scss';

type PropsType = {
  id: string;
  title: string;
  isPublished: boolean;
  createdAt: string;
  isStart: boolean;
  answerCount: number;
  deleteQuestion?: (id: string) => void;
  editQuestion: (id: string) => void;
};

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { id, title, isPublished, deleteQuestion, editQuestion, createdAt, answerCount } = props;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <a href="#">{title}</a>
        </div>
        <div className={styles.right}>
          {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
          &nbsp;
          <span>答卷: {answerCount}</span>
          &nbsp;
          <span>{createdAt}</span>
        </div>
      </div>

      <div className={styles['button-container']}>
        <div className={styles.left}>
          <button>编辑问卷</button>
          <button>问卷统计</button>
        </div>
        <div className={styles.right}>
          <button>收藏</button>
          <button>复制</button>
          <button>删除</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
