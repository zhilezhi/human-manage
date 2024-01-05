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
