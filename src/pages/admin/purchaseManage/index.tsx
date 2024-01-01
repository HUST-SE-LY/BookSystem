import { useEffect, useState } from "react"
import { Author, Keyword } from "../../supplier/supply";
import { adminFinishPurchase, adminGetPurchaseRecords } from "../../../utils/requests/admin";
import { TableColumnProps, Tag, Message, Button, Table } from "@arco-design/web-react";


export interface SinglePurchase {
  id: number;
  title: string;
  publisher: string;
  price: number;
  amount: number;
  Authors: Author[];
  Keywords: Keyword[];
  ok: boolean;
}

export const PurchaseManage = () => {
  const [list, setList] = useState<SinglePurchase[]>([])
  const columns: TableColumnProps[] = [
    {
      title: "订单id",
      dataIndex: 'id'
    },
    {
      title: "书名",
      dataIndex: "title",
    },
    {
      title: "单价",
      dataIndex: "price",
    },
    {
      title: "购买量",
      dataIndex: "amount",
    },
    {
      title: "作者",
      dataIndex: "Authors",
      render: (data: Author[]) => {
        return (
          <div>
            {data.map((el) => (
              <Tag key={el.name} className="ml-[8px]">
                {el.name}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "关键词",
      dataIndex: "Keywords",
      render: (data: Keyword[]) => {
        return (
          <div>
            {data.map((el) => (
              <Tag key={el.id} className="ml-[8px]">
                {el.content}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "确认到货",
      render: (_data: number, item: SinglePurchase) => {
        const finishPurchase = () => {
          adminFinishPurchase({id: item.id}).then(() => {
            Message.success("确认收货成功");
            setList(prev => prev.map((el) => {
              if(el.id === item.id) {
                el.ok = true;
              }
              return el
            }))
          })
        }
        return (
          <>
            {item.ok ? (
              <p>已到货</p>
            ) : (
              <Button onClick={finishPurchase} type="primary" size="small" >
                已到货
              </Button>
            )}
          </>
        );
      },
    },
  ];
  useEffect(() => {
    adminGetPurchaseRecords().then((res) => {
      setList(res.records);
    }).catch(() => {
      Message.error("获取订单失败")
    })
  },[])
  return <div className="p-[16px_32px]">
    <p className="text-xl font-bold">采购单</p>
    <Table data={list} columns={columns} />
  </div>
}