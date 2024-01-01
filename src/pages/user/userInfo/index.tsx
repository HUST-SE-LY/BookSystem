import {
  Input,
  Form,
  Switch,
  Button,
  Modal,
  Message,
} from "@arco-design/web-react";
import {
  UserInfo as UserInfoType,
  useAuthStore,
} from "../../../stores/useAuthStore";
import { useEffect, useState } from "react";
import {
  getUserInfo,
  userChangeInfo,
  userChangePassword,
  userTopUp,
} from "../../../utils/requests/user";
import { useNavigate } from "react-router-dom";

export const UserInfo = () => {
  const { info, setInfo, topUpRemain } = useAuthStore();
  const [name, setName] = useState("获取名称中");
  const [phone, setPhone] = useState("获取电话中");
  const [address, setAddress] = useState("获取地址中");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [topUpNumber, setTopUpNumber] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [visible, setVisible] = useState(false);
  const nav = useNavigate();
  const topUp = () => {
    if (parseFloat(topUpNumber) > 0) {
      userTopUp({ number: parseFloat(topUpNumber) })
        .then(() => {
          Message.success("充值成功");
          topUpRemain(parseFloat(topUpNumber));
          setVisible(false);
        })
        .catch(() => {
          Message.error("充值失败");
        });
    } else {
      Message.error("充值金额必须大于0");
    }
  };
  const changePassword = () => {
    if (!password) {
      Message.error("请输入密码");
      return;
    }
    if (password !== secondPassword) {
      Message.error("两次输入密码不一致");
      return;
    }
    userChangePassword({ password })
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
    userChangeInfo({ name, address, phone }).then(() => {
      Message.success("保存成功");
      setIsDisable(true);
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
  }
  useEffect(() => {
    getUserInfo().then((res) => {
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
        <p>信用等级： {(info as UserInfoType).creditLevel}</p>
        <Button className="block mt-[16px]" type={"primary"} onClick={logout}>
          退出登录
        </Button>
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
        <p>
          当前余额:
          <span className="text-lg font-bold px-[8px]">
            {(info as UserInfoType).remain}
          </span>
          元
        </p>
        {(info as UserInfoType).remain < 0 && <p className="text-red-500">透支{-(info as UserInfoType).remain}元</p>}
        <Button type={"primary"} onClick={() => setVisible(true)}>
          充值
        </Button>
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={topUp}
        >
          <Form layout="vertical">
            <Form.Item label="充值金额">
              <Input
                type="number"
                value={topUpNumber}
                onChange={(v) => setTopUpNumber(v)}
                placeholder="请输入金额"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
