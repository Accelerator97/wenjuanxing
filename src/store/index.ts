import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './userReducer';
import componentsReducer, { ComponentsStateType } from './componentReducer/index';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';

export type StateType = {
  user: UserStateType;
  components: ComponentsStateType;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    components: componentsReducer,
    pageInfo: pageInfoReducer,
  },
});
