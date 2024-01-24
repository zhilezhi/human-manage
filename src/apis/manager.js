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

/**
 * 班级相关接口
 * @param data
 * @returns {*}
 */
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

/**
 * 班级教师相关接口
 * @param data
 * @returns {*}
 */
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

/**
 * 课程相关接口
 * @param data
 * @returns {*}
 */
//获取课程列表
export function classCurriculumListApi(data) {
  return request({
    url: "/classcurriculum/getList",
    method: "POST",
    data,
  });
}
//课程列表新增 or 编辑
export function classesCurriculumInsertOrUpdateApi(data) {
  return request({
    url: "/classcurriculum/insertOrUpdateByDto",
    method: "POST",
    data,
  });
}
//课程详情接口
export function classesCurriculumDetailApi(data) {
  return request({
    url: "/classcurriculum/getInfoById",
    method: "POST",
    data,
  });
}
//删除课程接口
export function classesCurriculumDeleteApi(data) {
  return request({
    url: "/classcurriculum/delInfoById",
    method: "POST",
    data,
  });
}

/**
 * 学生相关掊口
 */
//学生列表接口
export function studentListApi(data) {
  return request({
    url: "/student/getList",
    method: "POST",
    data,
  });
}
//学生新增 or 编辑
export function studentInsertOrUpdateApi(data) {
  return request({
    url: "/student/insertOrUpdateByDto",
    method: "POST",
    data,
  });
}
//删除学生接口
export function studentDeleteApi(data) {
  return request({
    url: "/student/delInfoById",
    method: "POST",
    data,
  });
}
//学生工作记录新增 or 编辑
export function studentWorkExperienceInsertOrUpdateApi(data) {
  return request({
    url: "/studentworkexperience/insertOrUpdate",
    method: "POST",
    data,
  });
}
//学生就业经历列表
export function studentWorkExperienceListApi(data) {
  return request({
    url: "/studentworkexperience/getList",
    method: "POST",
    data,
  });
}
//学生详情接口
export function studentDetailApi(data) {
  return request({
    url: "/student/getInfoById",
    method: "POST",
    data,
  });
}

/**
 * 实训相关接口
 */
//实训列表接口
export function trainingActivityListApi(data) {
  return request({
    url: "/trainingactivity/getList",
    method: "POST",
    data,
  });
}
//实训新增接口
export function trainingActivityInsertOrUpdateApi(data) {
  return request({
    url: "/trainingactivity/insertOrUpdateTrainingByDto",
    method: "POST",
    data,
  });
}
//实训详情接口
export function trainingActivityDetailApi(data) {
  return request({
    url: "/trainingactivity/getInfoById",
    method: "POST",
    data,
  });
}
//实训删除接口
export function trainingActivityDeleteApi(data) {
  return request({
    url: "/trainingactivity/delInfoById",
    method: "POST",
    data,
  });
}

/**
 * 活动相关接口
 */
export function activityInsertOrUpdateApi(data) {
  return request({
    url: "/trainingactivity/insertOrUpdateActivityByDto",
    method: "POST",
    data,
  });
}
