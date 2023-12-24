import request from "@/utils/request.js";
export function goodsListApi(data) {
  return request({
    url: "/api/goods/index",
    method: "GET",
    data,
  });
}
