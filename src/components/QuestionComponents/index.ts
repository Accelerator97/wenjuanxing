import { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph';

export type ComponentPropsType =
  | QuestionInputPropsType
  | QuestionTitlePropsType
  | QuestionParagraphPropsType;

// 统一，组件的配置 type
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
];
// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
  // {
  //   groupId: 'chooseGroup',
  //   groupName: '用户选择',
  //   components: [],
  // },
];
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type);
}
