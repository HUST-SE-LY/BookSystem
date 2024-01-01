import { Layout, Menu } from "@arco-design/web-react";
import { IconUser, IconBook, IconHistory } from "@arco-design/web-react/icon";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export const SupplierHomeLayout = () => {
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
              <span className="max-sm:hidden">个人信息</span>
            </Menu.Item>
          </Link>
          <Link to="supply">
            <Menu.Item key="1">
              <IconHistory />
              <span className="max-sm:hidden">我的供书</span>
            </Menu.Item>
          </Link>
          <Link to="add">
            <Menu.Item key="2">
              <IconBook />
              <span className="max-sm:hidden">发布供书</span>
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
