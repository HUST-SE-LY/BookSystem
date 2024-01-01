import { Input, Form, Switch, Button, Message } from "@arco-design/web-react";
import {
  useAuthStore,
} from "../../../stores/useAuthStore";
import { useEffect, useState } from "react";
import {
  supplierChangeInfo,
  supplierChangePassword,
  supplierGetInfo,
} from "../../../utils/requests/supplier";
import { useNavigate } from "react-router-dom";

export const SupplierInfo = () => {
  const { info, setInfo } = useAuthStore();
  const [name, setName] = useState("获取名称中");
  const [phone, setPhone] = useState("获取电话中");
  const [address, setAddress] = useState("获取地址中");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const nav = useNavigate();
  const changePassword = () => {
    if (!password) {
      Message.error("请输入密码");
      return;
    }
    if (password !== secondPassword) {
      Message.error("两次输入密码不一致");
      return;
    }
    supplierChangePassword({ password })
      .then(() => {
        Message.success("修改成功");
        setPassword("");
        setSecondPassword("");
      })
      .catch(() => {
        Message.error("修改失败");
      });
  };

  const changeInfo = () => {
    supplierChangeInfo({ name, address, phone }).then(() => {
      Message.success("保存成功");
      setIsDisable(true);
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login")
  }
  useEffect(() => {
    supplierGetInfo().then((res) => {
      setInfo(res.info);
      setAddress(res.info.address);
      setName(res.info.name);
      setPhone(res.info.phone);
    });
  }, [setInfo]);
  if (!info) return <div>获取中</div>;
  return (
    <div className="p-[32px] w-full lg:flex gap-[48px]">
      <div className="flex-shrink-0 w-[400px] max-md:w-[300px]">
        <p className="text-xl font-bold">个人信息</p>
        <div className="flex items-center mb-[16px]">
          <p>编辑个人信息：</p>
          <Switch
            checked={!isDisable}
            onChange={() => setIsDisable((prev) => !prev)}
          />
        </div>
        <Form layout="vertical" disabled={isDisable}>
          <Form.Item label="账号">
            <Input value={info.account} disabled placeholder="请输入账号" />
          </Form.Item>
          <Form.Item label="名称">
            <Input
              value={name}
              onChange={(v) => setName(v)}
              placeholder="请输入名称"
            />
          </Form.Item>
          <Form.Item label="联系方式">
            <Input
              value={phone}
              onChange={(v) => setPhone(v)}
              placeholder="请输入联系方式"
            />
          </Form.Item>
          <Form.Item label="地址">
            <Input
              value={address}
              onChange={(v) => setAddress(v)}
              placeholder="请输入地址"
            />
          </Form.Item>
        </Form>
        {isDisable || (
          <Button type="primary" onClick={changeInfo}>
            保存
          </Button>
        )}
      </div>
      <div className="flex-shrink-0 w-[400px] max-md:w-[300px]">
        <p className="text-xl font-bold">修改密码</p>
        <Form layout="vertical">
          <Form.Item label="密码">
            <Input.Password
              value={password}
              onChange={(v) => setPassword(v)}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item label="再次输入密码">
            <Input.Password
              value={secondPassword}
              onChange={(v) => setSecondPassword(v)}
              placeholder="请再次输入密码"
            />
          </Form.Item>
        </Form>
        <Button type={"primary"} onClick={changePassword}>
          修改密码
        </Button>
        <Button className="block mt-[16px]" type={"primary"} onClick={logout}>
          退出登录
        </Button>
      </div>
    </div>
  );
};
