import { collegeListApi, majorListApi, teacherListApi } from "@/apis/index.js";

export const classesListData = async () => {
  const { data } = await collegeListApi({
    pageNum: 1,
    pageSize: 400,
  });
  return data.list.map((item) => ({
    ...item,
    label: item.collegeName,
    value: item.id,
  }));
};

export const majorListData = async (collegeId) => {
  const { data } = await majorListApi({ collegeId });
  return data.list.map((item) => ({
    ...item,
    label: item.major,
    value: item.id,
  }));
};
export const teacherListData = async () => {
  const { data } = await teacherListApi({
    pageNum: 1,
    pageSize: 400,
  });
  return data.list.map((item) => ({
    ...item,
    label: item.teacherName,
    value: item.id,
  }));
};
