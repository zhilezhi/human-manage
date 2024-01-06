import request from "@/utils/request.js";

export function userLoginApi(data) {
  return request({
    url: "/admin/login",
    method: "POST",
    data,
  });
}
//获取院校列表
export function collegeListApi(data) {
  return request({
    url: "college/getList",
    method: "POST",
    data,
  });
}
//获取班级列表
export function classesListApi(data) {
  return request({
    url: "/collegeclass/getList",
    method: "POST",
    data,
  });
}
//班级新增 or 编辑
export function classesInsertOrUpdateApi(data) {
  return request({
    url: "/collegeclass/insertOrUpdateByDto",
    method: "POST",
    data,
  });
}
//删除班级
export function classesDeleteApi(data) {
  return request({
    url: "/collegeclass/delInfoById",
    method: "POST",
    data,
  });
}
//获取班级详情
export function classesDetailApi(data) {
  return request({
    url: "/collegeclass/getInfoById",
    method: "POST",
    data,
  });
}

//获取专业列表
export function majorListApi(data) {
  return request({
    url: "/collegemajor/getList",
    method: "POST",
    data,
  });
}
//获取老师列表
export function teacherListApi(data) {
  return request({
    url: "/teacher/getList",
    method: "POST",
    data,
  });
}

//班级老师新增 or 修改
export function classesTeacherInsertOrUpdateApi(data) {
  return request({
    url: "/collegeclassteacher/insertOrUpdate",
    method: "POST",
    data,
  });
}
// 查询班级教师信息表列表功能接口
export function classesTeacherListApi(data) {
  return request({
    url: "/collegeclassteacher/getList",
    method: "POST",
    data,
  });
}
// 删除班级教师信息接口
export function classesTeacherDeleteApi(data) {
  return request({
    url: "/collegeclassteacher/delInfoById",
    method: "POST",
    data,
  });
}
