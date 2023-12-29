import request from "@/utils/request.js";

export function userLoginApi(data) {
  return request({
    url: "/admin/login",
    method: "POST",
    data,
  });
}
export function collegeListApi() {
  return request({
    url: "college/getList",
    method: "get",
  });
}

export function classesListApi(data) {
  return request({
    url: "/collegeclass/getList",
    method: "POST",
    data,
  });
}
