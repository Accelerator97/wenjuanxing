import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import { Button, Result, Spin } from 'antd';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import styles from './index.module.scss';
import StatHeader from './StatHeader';

const Stat: FC = () => {
  const nav = useNavigate();
  const { loading } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();
  // 修改标题
  useTitle(`问卷统计 - ${title}`);
  // loading 效果
  const LoadingELem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  );
  if (loading) {
    return LoadingELem;
  }

  // Content Elem
  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    }

    return (
      <>
        <div className={styles.left}>
          {/* <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          /> */}
          left
        </div>
        <div className={styles.main}>
          {/* <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          /> */}
          center
        </div>
        <div className={styles.right}>
          {/* <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          /> */}
          right
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading && LoadingELem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  );
};

export default Stat;
