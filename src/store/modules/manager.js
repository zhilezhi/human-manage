import { createSlice } from "@reduxjs/toolkit";
import { collegeListApi, majorListApi } from "@/apis/index.js";

const manager = createSlice({
  name: "manager",
  initialState: {
    collegeList: [], //院校列表
    majorList: [], //专业列表
  },
  reducers: {
    setCollegeList(state, action) {
      state.collegeList = action.payload;
    },
    setMajorList(state, action) {
      state.majorList = action.payload;
    },
  },
});

export const { setCollegeList, setMajorList } = manager.actions;

export const getCollegeList = () => {
  return async (dispatch) => {
    const res = await collegeListApi({ pageNum: 1, pageSize: 400 });
    dispatch(setCollegeList(res.data.list));
  };
};

export const getMajorList = (collegeId) => {
  return async (dispatch) => {
    const res = await majorListApi({ pageNum: 1, pageSize: 400, collegeId });
    dispatch(setMajorList(res.data.list));
  };
};

export default manager.reducer;
