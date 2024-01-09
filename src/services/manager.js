import {
  classesDetailApi,
  classesListApi,
  collegeListApi,
  majorListApi,
  teacherListApi,
} from "@/apis/index.js";
import { setTeacherList } from "@/store/modules/manager.js";
import store from "@/store/index.js";

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

export const classesListDataByMajor = async (collegeId, majorId) => {
  const { data } = await classesListApi({
    pageNum: 1,
    pageSize: 400,
    collegeId,
    majorId,
  });
  return data.list.map((item) => ({
    ...item,
    label: item.className,
    value: item.id,
  }));
};

export const teacherListData = async () => {
  const { manager } = store.getState();
  const { teacherList } = manager;

  const dataFormat = (list) => {
    return list.map((item) => ({
      ...item,
      label: item.teacherName,
      value: item.id,
    }));
  };

  if (teacherList.length) {
    return dataFormat(teacherList);
  }

  const { data } = await teacherListApi({
    pageNum: 1,
    pageSize: 400,
  });
  store.dispatch(setTeacherList(data.list));
  return dataFormat(data.list);
};
