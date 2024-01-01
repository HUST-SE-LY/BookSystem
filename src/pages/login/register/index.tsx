import { Button, Form, Input, Message, Radio } from "@arco-design/web-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userRegister } from "../../../utils/requests/user";
import { Role } from "../../../utils/const";
import { supplierRegister } from "../../../utils/requests/supplier";

export const Register = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const handleRegister = async () => {
    if (role === Role.USER) {
      try {
        const res = await userRegister({
          account,
          name,
          password,
          address,
          phone,
        });
        localStorage.setItem("token", res.token);
      } catch (e) {
        Message.error("注册错误");
      }
    } else {
      try {
        const res = await supplierRegister({
          account,
          name,
          password,
          address,
          phone,
        });
        localStorage.setItem("token", res.token);
      } catch (e) {
        Message.error("注册错误");
      }
    }
  };
  return (
    <>
      <p className="text-center text-2xl mb-[8px] font-bold mt-0">注册</p>
      <Form onSubmit={handleRegister} layout="vertical">
        <Form.Item label="账号" field="账号" rules={[{ required: true }]}>
          <Input
            value={account}
            onChange={(value) => setAccount(value)}
            placeholder="请输入账号"
          />
        </Form.Item>
        <Form.Item label="名称" field="名称" rules={[{ required: true }]}>
          <Input
            value={name}
            onChange={(value) => setName(value)}
            placeholder="请输入名称"
          />
        </Form.Item>
        <Form.Item label="密码" field="密码" rules={[{ required: true }]}>
          <Input.Password
            autoComplete="off"
            value={password}
            onChange={(value) => setPassword(value)}
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item
          label="确认密码"
          field="二次输入密码"
          rules={[{ required: true }]}
        >
          <Input.Password
            autoComplete="off"
            value={secondPassword}
            onChange={(value) => setSecondPassword(value)}
            placeholder="请再次输入密码"
          />
        </Form.Item>
        <Form.Item label="地址" field="地址" rules={[{ required: true }]}>
          <Input
            value={address}
            onChange={(value) => setAddress(value)}
            placeholder="请输入地址"
          />
        </Form.Item>
        <Form.Item label="电话" field="电话" rules={[{ required: true }]}>
          <Input
            value={phone}
            onChange={(value) => setPhone(value)}
            placeholder="请输入联系方式"
          />
        </Form.Item>
        <Form.Item label="身份" field="身份" rules={[{ required: true }]}>
          <Radio.Group
            value={role}
            onChange={(value) => setRole(value)}
            options={[Role.USER, Role.SUPPLIER]}
          />
        </Form.Item>
        <Button htmlType="submit" type="primary" className="my-[16px]">
          注册
        </Button>
        <Link to="/login" className="w-full">
          <Button className="my-[16px] w-full">返回登录</Button>
        </Link>
      </Form>
    </>
  );
};
