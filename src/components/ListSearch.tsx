import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from 'antd';
import { LIST_SEARCH_PARAM_KEY } from '../constant';

const { Search } = Input;
const ListSearch: FC = () => {
  const [value, setValue] = useState('');
  const nav = useNavigate();
  const { pathname } = useLocation();
  // 获取 url 参数，并设置到 input value（同步路由的search 到 input 针对刷新当前页面 状态同步 ）
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setValue(curVal);
  }, [searchParams]);
  // 确定搜索 改变url
  function handleSearch(value: string) {
    // 跳转页面，增加 url 参数
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`, // 去掉了 page pageSize
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <>
      <Search
        placeholder="请输入关键字"
        value={value}
        allowClear
        style={{ width: '250px' }}
        onChange={handleChange}
        onSearch={handleSearch}
      />
    </>
  );
};

export default ListSearch;
