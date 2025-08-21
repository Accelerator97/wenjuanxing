import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './userReducer';
import componentsReducer, { ComponentStateType } from './componentReducer/index';

export type StateType = { user: UserStateType; components: ComponentStateType };

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    components: componentsReducer,
  },
});
