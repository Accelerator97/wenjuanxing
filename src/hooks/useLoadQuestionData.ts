import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import { resetComponents } from '../store/componentReducer';

function useLoadQuestionData() {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  // ajax获取数据
  const { loading, error, data, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷id');
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (!data) return;
    const { title, componentList } = data;
    // componentList 存入到redux
    dispatch(resetComponents({ componentList }));
  }, [data]);

  useEffect(() => {
    // 判断id变化 重新执行ajax请求获取数据
    run(id);
  }, [id]);

  return { loading, data, error };
}

export default useLoadQuestionData;
