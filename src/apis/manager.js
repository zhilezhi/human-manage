import request from "@/utils/request.js";

export function userLoginApi(data) {
  return request({
    url: "/admin/login",
    method: "POST",
    data,
  });
}
export function collegeListApi(data) {
  return request({
    url: "college/getList",
    method: "POST",
    data,
  });
}

export function classesListApi(data) {
  return request({
    url: "/collegeclass/getList",
    method: "POST",
    data,
  });
}

export function majorListApi(data) {
  return request({
    url: "/collegemajor/getList",
    method: "POST",
    data,
  });
}
