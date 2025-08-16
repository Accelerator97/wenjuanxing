import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';
import { useRequest } from 'ahooks';

function useLoadQuestionData() {
  const { id = '' } = useParams();
  //   const [loading, setLoading] = useState(true);
  //   const [questionData, setQuestionData] = useState({});
  //   useEffect(() => {
  //     const fn = async () => {
  //       const data = await getQuestionService(id);
  //       console.log('edit data', data);
  //       setQuestionData(data);
  //       setLoading(false);
  //     };
  //     fn();
  //   }, []);

  async function loadData() {
    const data = await getQuestionService(id);
    return data;
  }

  const { loading, error, data } = useRequest(loadData);

  return { loading, data, error };
}

export default useLoadQuestionData;
