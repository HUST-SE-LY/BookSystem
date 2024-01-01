import {
  Button,
  Message,
  Table,
  TableColumnProps,
} from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { userConfirmBook, userGetOrders } from "../../../utils/requests/user";

export interface SingleOrder {
  id: number;
  date: string;
  user_id: number;
  book_id: number;
  amount: number;
  price: number;
  address: string;
  has_deliver: boolean;
  has_get: boolean;
  total_price: number;
}

export const Orders = () => {
  const [list, setList] = useState<SingleOrder[]>([]);
  const columns: TableColumnProps[] = [
    {
      title: "订单号",
      dataIndex: "id",
    },
    {
      title: "书号",
      dataIndex: "book_id",
    },
    {
      title: "下单日期",
      dataIndex: "date",
    },
    {
      title: "收货地址",
      dataIndex: "address",
    },
    {
      title: "总价格",
      dataIndex: "total_price",
    },
    {
      title: "是否发货",
      dataIndex: "has_deliver",
      render: (data: boolean) => <p>{data ? "已发货" : "未发货"}</p>,
    },
    {
      title: "确认收货",
      dataIndex: "has_get",
      render: (data: boolean, item: SingleOrder) => {
        const confirmGet = () => {
          userConfirmBook({
            id: item.id,
          }).then(() => {
            setList((prev) =>
              prev.map((el) => {
                el.id === item.id && (el.has_get = true);
                return el;
              })
            );
            Message.success("确认收货成功");
          });
        };
        return item.has_deliver ? (
          data ? (
            <p>已收货</p>
          ) : (
            <Button status="warning" onClick={confirmGet}>确认收货</Button>
          )
        ) : (
          <p>发货后可操作</p>
        );
      },
    },
  ];
  useEffect(() => {
    userGetOrders().then((res) => {
      setList(res.orders);
    });
  }, []);
  return (
    <div className="p-[16px_32px]">
      <p className="text-xl font-bold">我的订单</p>
      <Table data={list} columns={columns} />
    </div>
  );
};
