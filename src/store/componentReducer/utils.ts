import { ComponentInfoType, ComponentStateType } from './index';

export function insertNewComponent(draft: ComponentStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex(c => c.fe_id === selectedId);

  if (index < 0) {
    // 未选中任何组件
    draft.componentList.push(newComponent);
  } else {
    // 选中了组件，插入到 index 后面
    draft.componentList.splice(index + 1, 0, newComponent);
  }

  draft.selectedId = newComponent.fe_id;
}
