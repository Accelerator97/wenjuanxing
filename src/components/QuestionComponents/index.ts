import { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';

export type ComponentPropsType = QuestionInputPropsType | QuestionTitlePropsType;

// 统一，组件的配置 type
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf];

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type);
}
