import request from "@/utils/request.js";
export function goodsListApi(data) {
  return request({
    url: "/goods/index",
    method: "GET",
    data,
  });
}
export function userLoginApi(data) {
  return request({
    url: "/admin/login",
    method: "POST",
    data,
  });
}
