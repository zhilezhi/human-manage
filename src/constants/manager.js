import { trainingActivityListApi } from "@/apis/index.js";

export const classesStateEnum = [
  {
    label: "学习中",
    value: 1,
    status: "Processing",
  },
  {
    label: "已毕业",
    value: 2,
    status: "Success",
  },
];
export const genderEnum = [
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];
export const nationEnum = [
  {
    label: "汉族",
    value: "汉族",
  },
  {
    label: "满族",
    value: "满族",
  },
  {
    label: "蒙古族",
    value: "蒙古族",
  },
  {
    label: "回族",
    value: "回族",
  },
  {
    label: "藏族",
    value: "藏族",
  },
  {
    label: "维吾尔族",
    value: "维吾尔族",
  },
  {
    label: "苗族",
    value: "苗族",
  },
  {
    label: "彝族",
    value: "彝族",
  },
  {
    label: "壮族",
    value: "壮族",
  },
  {
    label: "布依族",
    value: "布依族",
  },
  {
    label: "侗族",
    value: "侗族",
  },
  {
    label: "瑶族",
    value: "瑶族",
  },
  {
    label: "白族",
    value: "白族",
  },
  {
    label: "土家族",
    value: "土家族",
  },
  {
    label: "哈尼族",
    value: "哈尼族",
  },
  {
    label: "哈萨克族",
    value: "哈萨克族",
  },
  {
    label: "傣族",
    value: "傣族",
  },
  {
    label: "黎族",
    value: "黎族",
  },
  {
    label: "傈僳族",
    value: "傈僳族",
  },
  {
    label: "佤族",
    value: "佤族",
  },
  {
    label: "畲族",
    value: "畲族",
  },
  {
    label: "高山族",
    value: "高山族",
  },
  {
    label: "拉祜族",
    value: "拉祜族",
  },
  {
    label: "水族",
    value: "水族",
  },
  {
    label: "东乡族",
    value: "东乡族",
  },
  {
    label: "纳西族",
    value: "纳西族",
  },
  {
    label: "景颇族",
    value: "景颇族",
  },
  {
    label: "柯尔克孜族",
    value: "柯尔克孜族",
  },
  {
    label: "土族",
    value: "土族",
  },
  {
    label: "达斡尔族",
    value: "达斡尔族",
  },
  {
    label: "仫佬族",
    value: "仫佬族",
  },
  {
    label: "羌族",
    value: "羌族",
  },
  {
    label: "布朗族",
    value: "布朗族",
  },
  {
    label: "撒拉族",
    value: "撒拉族",
  },
  {
    label: "毛南族",
    value: "毛南族",
  },
  {
    label: "仡佬族",
    value: "仡佬族",
  },
  {
    label: "锡伯族",
    value: "锡伯族",
  },
  {
    label: "阿昌族",
    value: "阿昌族",
  },
  {
    label: "普米族",
    value: "普米族",
  },
  {
    label: "朝鲜族",
    value: "朝鲜族",
  },
  {
    label: "塔吉克族",
    value: "塔吉克族",
  },
  {
    label: "怒族",
    value: "怒族",
  },
  {
    label: "乌孜别克族",
    value: "乌孜别克族",
  },
  {
    label: "俄罗斯族",
    value: "俄罗斯族",
  },
  {
    label: "鄂温克族",
    value: "鄂温克族",
  },
  {
    label: "德昂族",
    value: "德昂族",
  },
  {
    label: "保安族",
    value: "保安族",
  },
  {
    label: "裕固族",
    value: "裕固族",
  },
  {
    label: "京族",
    value: "京族",
  },
  {
    label: "塔塔尔族",
    value: "塔塔尔族",
  },
  {
    label: "独龙族",
    value: "独龙族",
  },
  {
    label: "鄂伦春族",
    value: "鄂伦春族",
  },
  {
    label: "赫哲族",
    value: "赫哲族",
  },
  {
    label: "门巴族",
    value: "门巴族",
  },
  {
    label: "珞巴族",
    value: "珞巴族",
  },
  {
    label: "基诺族",
    value: "基诺族",
  },
];
//活动状态
export const activityStateEnum = [
  {
    label: "进行中",
    value: 2,
  },
  {
    label: "已完成",
    value: 3,
  },
  {
    label: "已取消",
    value: 4,
  },
];
//活动类型
export const activityTypeEnum = [
  {
    label: "项目实训",
    value: 1,
  },
  {
    label: "活动",
    value: 2,
  },
  {
    label: "就业/实习",
    value: 3,
  },
];
//项目周期
export const attendancePeriodEnum = [
  {
    label: "每周一",
    value: 1,
  },
  {
    label: "每周二",
    value: 2,
  },
  {
    label: "每周三",
    value: 3,
  },
  {
    label: "每周四",
    value: 4,
  },
  {
    label: "每周五",
    value: 5,
  },
  {
    label: "每周六",
    value: 6,
  },
  {
    label: "每周日",
    value: 7,
  },
];
