import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/QuestionComponents';
import { produce } from 'immer';
import { getNextSelectedId, insertNewComponent } from './utils';
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
  isHidden?: boolean;
  isLocked?: boolean;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
};
export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents(state: ComponentStateType, action: PayloadAction<ComponentStateType>) {
      return action.payload;
    },
    changeSelectedId: produce((draft: ComponentStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload;
    }),
    // 添加新组件
    addComponent: produce((draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload;
      insertNewComponent(draft, newComponent);
    }),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload;

        // 当前要修改属性的这个组件
        const curComp = draft.componentList.find(c => c.fe_id === fe_id);
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          };
        }
      }
    ),
    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentStateType) => {
      const { componentList = [], selectedId: removedId } = draft;

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removedId, componentList);
      draft.selectedId = newSelectedId;

      const index = componentList.findIndex(c => c.fe_id === removedId);
      componentList.splice(index, 1);
    }),

    // 隐藏/显示 组件
    changeComponentHidden: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft;
        const { fe_id, isHidden } = action.payload;

        // 重新计算 selectedId
        let newSelectedId = '';
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList);
        } else {
          // 要显示
          newSelectedId = fe_id;
        }
        draft.selectedId = newSelectedId;

        const curComp = componentList.find(c => c.fe_id === fe_id);
        if (curComp) {
          curComp.isHidden = isHidden;
        }
      }
    ),

    // 锁定/解锁 组件
    toggleComponentLocked: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload;

        const curComp = draft.componentList.find(c => c.fe_id === fe_id);
        if (curComp) {
          curComp.isLocked = !curComp.isLocked;
        }
      }
    ),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
} = componentSlice.actions;

export default componentSlice.reducer;
