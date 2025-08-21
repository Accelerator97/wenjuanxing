import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../../../services/question';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/componentReducer';

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData();
  const dispatch = useDispatch();
  function clearSelectedId() {
    dispatch(changeSelectedId(''));
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}> header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading}></EditCanvas>
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
