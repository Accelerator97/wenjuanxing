import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/QuestionComponents';
import { produce } from 'immer';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
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
  },
});

export const { resetComponents, changeSelectedId } = componentSlice.actions;

export default componentSlice.reducer;
