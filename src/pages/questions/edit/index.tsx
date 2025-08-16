import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../../../services/question';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

const Edit: FC = () => {
  // const { id = '' } = useParams();
  // const [loading, setLoading] = useState(true);
  // const [qData, setQdata] = useState({});
  // useEffect(() => {
  //   const fn = async () => {
  //     const data = await getQuestionService(id);
  //     console.log('edit data', data);
  //     setQdata(data);
  //     setLoading(false);
  //   };
  //   fn();
  // }, []);
  const { loading, data } = useLoadQuestionData();
  return <div>{loading ? '加载中' : JSON.stringify(data)}</div>;
};

export default Edit;
