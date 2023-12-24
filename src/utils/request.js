import axios from "axios";
import NProgress from "nprogress";
import { message } from "antd"; // ant 组件配置下面会讲到
// import qs from 'qs';
// import store from '@/store';

import "nprogress/nprogress.css";

//返回其他状态码
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500;
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress 配置
NProgress.configure({
  showSpinner: false,
});

//默认超时时间
axios.defaults.timeout = 30000;

//表单序列化
const serialize = (data) => {
  const list = [];
  Object.keys(data).forEach((ele) => {
    list.push(`${ele}=${data[ele]}`);
  });
  return list.join("&");
};

// 配置请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 开启进度条
    NProgress.start();
    const token = window.localStorage.getItem("token");
    const meta = config.meta || {};
    // 让每个请求都携带token
    if (token) {
      config.headers["Authorization"] = token; // 配置请求头，token的值在自己项目中获取
    }
    /**
     *  下面的部分可以不写
     */
    //headers中配置text请求
    if (config.text === true) {
      config.headers["Content-Type"] = "text/plain";
    }
    //headers中配置serialize为true开启序列化
    if (config.method === "post" && meta.isSerialize === true) {
      config.data = serialize(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 配置响应拦截器
axios.interceptors.response.use(
  (res) => {
    // 关闭顶部加载进度条
    NProgress.done();
    const status = res.data.code || res.status;
    const statusWhiteList = [];
    const messages =
      res.data.msg ||
      res.data.error_description ||
      res.data.message ||
      "未知错误";
    //如果是401则跳转到登录页面
    if (status === 401 || status === 403) {
      window.location.href = "/#/login"; // 如果使用的是 HistoryRouter,路径需要替换，不带 #
      message.destroy();
      message.error("登录过期，请重新登录");
      return Promise.reject();
    }
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      if (res.config.responseType === "blob") {
        const fileReader = new FileReader();
        fileReader.readAsText(res.data);
        fileReader.onload = function () {
          const result = JSON.parse(res.data);
          if (!result.message) {
            result.message = "未知错误";
          }
          message.destroy();
          message.error(result.message);
          return Promise.reject(new Error(result.message));
        };
      } else {
        message.destroy();
        message.error(messages);
        return Promise.reject(new Error(messages));
      }
    }

    return res.data || res;
  },
  (error) => {
    NProgress.done();
    const response = error.response;
    // 下面我列举几个常见状态码，具体根据项目中需要，可以将其封装在一个文件中，便于美观
    if (response.status === 401) {
      message.error("登陆已失效");
      window.location.href = "/#/login";
    } else if (response.status === 403) {
      message.error("账号没有权限，请联系管理员");
      window.location.href = "/#/login";
    } else if (response.status === 404) {
      message.error("接口不存在，请联系管理员");
    } else if (response.status === 500) {
      message.error("系统异常，请联系管理员");
    }
    return Promise.reject(new Error(error));
  },
);

export default axios;
