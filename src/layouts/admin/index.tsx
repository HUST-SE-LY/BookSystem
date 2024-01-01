import { Layout, Menu } from "@arco-design/web-react";
import {
  IconUser,
  IconBook,
  IconHistory,
  IconCheckSquare,
} from "@arco-design/web-react/icon";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export const AdminHomeLayout = () => {
  const [width, setWidth] = useState(window.innerWidth < 640 ? 50 : 200);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setWidth(50);
      } else {
        setWidth(200);
      }
    };
    addEventListener("resize", handleResize);
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Layout className="w-full h-screen">
      <Layout.Sider width={width} className="max-sm:w-[40px]">
        <Menu defaultSelectedKeys={["0"]}>
          <Link to="">
            <Menu.Item key="0">
              <IconUser />
              <span className="max-sm:hidden">用户管理</span>
            </Menu.Item>
          </Link>
          <Link to="supply">
            <Menu.Item key="1">
              <IconCheckSquare />
              <span className="max-sm:hidden">供货信息</span>
            </Menu.Item>
          </Link>
          <Link to="missing_records">
            <Menu.Item key="2">
              <IconBook />
              <span className="max-sm:hidden">缺书登记</span>
            </Menu.Item>
          </Link>
          <Link to="purchase">
            <Menu.Item key="3">
              <IconHistory />
              <span className="max-sm:hidden">采购单</span>
            </Menu.Item>
          </Link>
          <Link to="orders">
            <Menu.Item key="4">
              <IconHistory />
              <span className="max-sm:hidden">发货管理</span>
            </Menu.Item>
          </Link>
          <Link to="book">
            <Menu.Item key="5">
              <IconBook />
              <span className="max-sm:hidden">现有存书</span>
            </Menu.Item>
          </Link>
        </Menu>
      </Layout.Sider>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
