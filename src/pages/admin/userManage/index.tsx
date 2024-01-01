import { useEffect, useState } from "react";
import { adminGetUsers, adminSetCreditLevel } from "../../../utils/requests/admin";
import { Message, Rate, Table, TableColumnProps } from "@arco-design/web-react";

export interface SingleUser {
  id: number;
  name: string;
  phone: string;
  creditLevel: number;
}

export const UserManage = () => {
  const [userList, setUserList] = useState<SingleUser[]>([]);
  const [pagination] = useState({
    sizeCanChange: true,
    pageSize: 20,
    current: 1,
    showTotal: false,
  });
  const changeCreditLevel = (level: number, id: number) => {
    adminSetCreditLevel({id, level}).then(() => {
      Message.success("设置信用等级成功");
    }).catch(() => {
      Message.error("设置信用等级失败")
    })
  }
  const columns: TableColumnProps[] = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "电话",
      dataIndex: "phone",
    },
    {
      title: "信用等级",
      dataIndex: "creditLevel",
      render: (data,items:SingleUser) => {
        return <Rate
          style={{ display: "block", margin: "10px 0" }}
          onChange={(v) => changeCreditLevel(v, items.id)}
          defaultValue={data}
          allowHalf={false}
          character={(index) => <span>{index + 1}</span>}
        />
      }
        
    },
  ];
  useEffect(() => {
    adminGetUsers().then((res) => {
      setUserList(res.users);
    });
  }, []);

  return (
    <div className="p-[16px_32px]">
      <p className="text-xl font-bold">用户信息</p>
      <Table pagination={pagination} rowKey="id" data={userList} columns={columns} />
    </div>
  );
};
