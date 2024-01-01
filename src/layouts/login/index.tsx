import { Layout } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";

export const LoginLayout = () => {
  return (
    <>
      <Layout className="w-full min-h-screen bg-gray-50">
        <Layout.Content>
          <div className="w-[500px] max-sm:w-[300px] p-[10px_40px] bg-white shadow-xl shadow-gray-100  mx-[auto] rounded-xl mt-[80px] mb-[20px]">
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
};
