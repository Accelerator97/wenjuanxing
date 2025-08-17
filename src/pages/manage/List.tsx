import React, { FC, useEffect, useRef, useState } from 'react';
import Styles from './common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useSearchParams } from 'react-router-dom';
import { produce } from 'immer';
import { Typography, Spin, Empty } from 'antd';
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import ListSearch from '../../components/ListSearch';
import { getQuestionListService } from '../../services/question';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant';

const { Title } = Typography;

const List: FC = () => {
  useTitle('问卷星 - 我的问卷');

  const [started, setStarted] = useState(false); // 是否已经开始加载（防抖，有延迟时间）
  const [page, setPage] = useState(1); // 不在url上显示
  const [list, setList] = useState([]); // 累计的列表数据
  const [total, setTotal] = useState(0);

  const hasMoreData = list.length < total;
  const [searchParams] = useSearchParams(); // url 参数，虽然没有 page pageSize ，但有 keyword
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  // keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 真正加载数据
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l)); // 使用 prevList 确保获取最新的 list
        setTotal(total);
        setPage(prevPage => prevPage + 1); // 使用 prevPage 确保获取最新的 page
      },
    }
  );

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      // 滚动加载更多
      const element = containerRef.current || null;
      if (!element) return;
      const domRect = element.getBoundingClientRect();
      if (!domRect) return;

      // 3. 判断元素是否在视口中
      const isVisible = domRect.top < window.innerHeight && domRect.bottom >= 0;

      // 4. 如果元素可见，执行加载更多操作
      if (isVisible) {
        // console.log('加载更多...');
        // 可以在这里执行获取下一页数据的逻辑
        load();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    }
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const contentListRef = useRef<HTMLDivElement>(null);

  // 页面加载 或者url变动 主要是keyword搜索
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // 页面加载 或者滚动
  useEffect(() => {
    contentListRef.current?.addEventListener('scroll', tryLoadMore);
    return () => contentListRef.current?.removeEventListener('scroll', tryLoadMore); // 解绑事件
  }, [searchParams, hasMoreData]);

  function edit(id: string) {
    //
  }

  const LoadMoreContentElem = () => {
    console.log('loading', total, list.length, hasMoreData);
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!hasMoreData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  };
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
      <div className={Styles.content} ref={contentListRef}>
        {!loading &&
          list.length > 0 &&
          list.map((item: any) => {
            const { id } = item;
            return <QuestionCard key={id} {...item} editQuestion={edit} />;
          })}

        <div className={Styles.footer} ref={containerRef}>
          {LoadMoreContentElem()}
        </div>
      </div>
    </>
  );
};

export default List;
