import { useSelector } from 'react-redux';
import { UserStateType } from '../store/userReducer';
import { StateType } from '../store/index';

function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType;
  return { username, nickname };
}

export default useGetUserInfo;
