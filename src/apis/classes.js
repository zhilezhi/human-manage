import request from "@/utils/request.js";
export function classesListApi(data) {
  return request({
    url: "/collegeclass/getList",
    method: "POST",
    data,
  });
}
