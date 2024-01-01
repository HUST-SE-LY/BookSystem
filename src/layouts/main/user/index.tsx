import { Layout, Menu } from "@arco-design/web-react";
import { IconUser, IconBook, IconHistory } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const UserHomeLayout = () => {
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
              <span className="max-sm:hidden">个人中心</span>
            </Menu.Item>
          </Link>
          <Link to="books">
            <Menu.Item key="1">
              <IconBook />
              <span className="max-sm:hidden">浏览书店</span>
            </Menu.Item>
          </Link>
          <Link to="orders">
            <Menu.Item key="2">
              <IconHistory />
              <span className="max-sm:hidden">我的订单</span>
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
