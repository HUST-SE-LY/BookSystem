import { TableColumnProps, Button, Table, Message } from "@arco-design/web-react";
import { useState, useEffect } from "react";
import { adminGetOrders, adminStartDeliver } from "../../../utils/requests/admin";
import { SingleOrder } from "../../user/orders";

export const OrderManage = () => {
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
      title: "用户号",
      dataIndex: 'user_id',
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
      render: (data: boolean, item: SingleOrder) => {
        const startDelivery = () => {
          adminStartDeliver({id: item.id}).then(() => {
            Message.success("发货成功");
            setList(prev => prev.map((el) => {
              el.id === item.id && (el.has_deliver = true);
              return el;
            }))
          })
        };
        return data ? (
          "已发货"
        ) : (
          <Button onClick={startDelivery} type="primary">
            发货
          </Button>
        );
      },
    },
    {
      title: "确认收货",
      dataIndex: "has_get",
      render: (data: boolean) => <p>{data ? "已收货" : "未收货"}</p>,
    },
  ];
  useEffect(() => {
    adminGetOrders().then((res) => {
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
