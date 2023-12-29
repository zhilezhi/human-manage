import managerRoutes from "@/router/modules/manager";

export default {
  route: {
    path: "/",
    routes: managerRoutes,
  },
  location: {
    pathname: "/",
  },
  // appList: [
  //   {
  //     icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
  //     title: "Ant Design",
  //     desc: "杭州市较知名的 UI 设计语言",
  //     url: "https://ant.design",
  //   },
  // ],
};
