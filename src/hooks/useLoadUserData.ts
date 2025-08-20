import { useEffect, useState } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '../services/user';
import { loginReducer } from '../store/userReducer';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '../router';

function useLoadUseData() {
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);
  const { username } = useGetUserInfo();
  // ajax 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname })); // 存储到 redux store
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });
  useEffect(() => {
    if (username) {
      // 如果redux  store已经存在用户信息 不用重新加载
      setWaitingUserData(false);
      return;
    }
    run(); // 没有用户信息就通过接口获取
  }, [username]);
  return { waitingUserData };
}

export default useLoadUseData;
