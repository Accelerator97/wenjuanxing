import axios, { ResDataType } from './ajax';
// import type { ResDataType } from './ajax';  类型也可以这么获取
type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};
// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question';
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = `/api/questionList`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

// 更新单个问卷
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/updateQuestion/${id}`;
  const data = (await axios.post(url, opt)) as ResDataType;
  return data;
}
