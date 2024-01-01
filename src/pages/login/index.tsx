import { Button, Form, Input, Message, Radio } from "@arco-design/web-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../utils/requests/user";
import { Role } from "../../utils/const";
import { adminLogin } from "../../utils/requests/admin";
import { supplierLogin } from "../../utils/requests/supplier";

export const Login = () => {
  const [form] = Form.useForm();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const nav = useNavigate();
  const handleLogin = async () => {
    try {
      let res;
      if (role === Role.ADMIN) {
        res = await adminLogin({ account, password });
      } else if (role === Role.SUPPLIER) {
        res = await supplierLogin({ account, password });
      } else {
        res = await userLogin({ account, password });
      }
      localStorage.setItem("token", res.token);
      nav("/");
    } catch (e) {
      Message.error("登录错误");
    }
  };
  return (
    <>
      <p className="text-center text-2xl mb-[8px] font-bold mt-0">登录</p>
      <Form onSubmit={handleLogin} layout="vertical" form={form}>
        <Form.Item
          label="账号"
          field="账号"
          tooltip={<div>Username is required </div>}
          rules={[{ required: true }]}
        >
          <Input
            value={account}
            onChange={(value) => setAccount(value)}
            placeholder="请输入账号"
          />
        </Form.Item>
        <Form.Item label="密码" field="密码" rules={[{ required: true }]}>
          <Input.Password
            value={password}
            onChange={(value) => setPassword(value)}
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item label="身份" field="身份" rules={[{ required: true }]}>
          <Radio.Group
            value={role}
            onChange={(value) => setRole(value)}
            options={[Role.USER, Role.SUPPLIER, Role.ADMIN]}
          />
        </Form.Item>
        <Button htmlType="submit" type="primary" className="my-[16px]">
          登录
        </Button>
        <Link to="register" className="w-full">
          <Button className="my-[16px] w-full">前往注册</Button>
        </Link>
      </Form>
    </>
  );
};
