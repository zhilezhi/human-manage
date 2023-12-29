import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Breadcrumb, Avatar } from "antd";
import classNames from "classnames";
import { Outlet, useNavigate } from "react-router-dom";
import managerRoutes from "@/router/modules/manager.jsx";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = managerRoutes.map((item) => ({ ...item, key: item.path }));

  const navigate = useNavigate();

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-32px m-16px text-white bg-white bg-opacity-20 rounded-6px center">
          恒成智慧学苑
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          onSelect={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout>
        <Header
          className={classNames("center p-0 px-16px")}
          style={{
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="w-64px h-64px text-16px flex-1 text-left"
          />
          <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
            U
          </Avatar>
        </Header>
        <Breadcrumb
          className="m-16px"
          items={[
            {
              title: "Home",
            },
            {
              title: <a href="">Application Center</a>,
            },
            {
              title: <a href="">Application List</a>,
            },
            {
              title: "An Application",
            },
          ]}
        />
        <Content
          style={{
            margin: "0 16px 24px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
