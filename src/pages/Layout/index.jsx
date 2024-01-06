import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
} from "@ant-design/pro-components";
import { useState } from "react";
import defaultProps from "./defaultProps.jsx";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const [pathname, setPathname] = useState("/manager/classes");
  const navigate = useNavigate();

  return (
    <ProConfigProvider dark={false}>
      <ProLayout
        title="恒成智慧学苑"
        logo={false}
        siderWidth={216}
        {...defaultProps}
        breadcrumbRender={(routers = []) => {
          // console.log(routers);
          return [
            {
              path: "/",
              title: "主页",
            },
            ...routers,
          ];
        }}
        location={{
          pathname,
        }}
        avatarProps={{
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          title: "七妮妮",
          size: "small",
        }}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              console.log({ item });
              setPathname(item.path);
              navigate(item.path);
            }}
          >
            {dom}
          </div>
        )}
      >
        <PageContainer>
          <ProCard
            style={{
              height: "100vh",
              minHeight: 800,
            }}
          >
            <Outlet />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </ProConfigProvider>
  );
};
export default Layout;
