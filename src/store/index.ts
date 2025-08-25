import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './userReducer';
import componentsReducer, { ComponentsStateType } from './componentReducer/index';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';
export type StateType = {
  user: UserStateType;
  components: StateWithHistory<ComponentsStateType>; // 增加了 undo
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    // 增加了 undo
    components: undoable(componentsReducer, {
      limit: 20, // 限制 undo 20 步
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
});
