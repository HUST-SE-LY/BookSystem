import { useEffect, useState } from "react";
import { Author, Keyword } from "../../supplier/supply";
import { userBuyBook, userGetBooks } from "../../../utils/requests/user";
import { Button, Form, InputNumber, Message, Modal, Table, TableColumnProps, Tag } from "@arco-design/web-react";
import { UserInfo, useAuthStore } from "../../../stores/useAuthStore";

export interface SingleBook {
  id: number;
  title: string;
  publisher: string;
  amount: number;
  price: number;
  coverImage: string;
  contents: string;
  Authors: Author[];
  Keywords: Keyword[];
}

export const Books = () => {
  const [list, setList] = useState<SingleBook[]>([]);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState(0);
  const [price, setPrice] = useState(0);
  const {info} = useAuthStore()
  const columns: TableColumnProps[] = [
    {
      title: "书号",
      dataIndex: "id",
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
      title: "存量",
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
      title: '购买',
      render:(_data, item: SingleBook) => {
        const openModal = () => {
          setId(item.id);
          setPrice(item.price);
          setVisible(true);
        }
        return <Button onClick={openModal}>购买</Button>
      }
    }
  ];
  const buyBook = () => {
    userBuyBook({
      amount,
      id,
    }).then(() => {
      Message.success("购买成功");
    })
  }
  useEffect(() => {
    userGetBooks().then((res) => {
      setList(res.books);
    }).catch(() => {
      Message.error("获取书籍失败");
    })
  },[])
  if(!info) return <div></div>
  return <div className="p-[16px_32px]">
    <p className="text-xl font-bold">书店图书</p>
    <Table data={list} columns={columns} />
    <Modal onOk={buyBook} visible={visible} onCancel={() => setVisible(false)}>
      <p>你的信用等级：{(info as UserInfo).creditLevel}</p>
      <p>你的余额：{(info as UserInfo).remain}元</p>
      <p>单价：{price}元</p>
      {(info as UserInfo).creditLevel >= 3 && <p>可以货到付款</p>}
      <Form>
        <Form.Item label="购买数量">
          <InputNumber value={amount} onChange={v => setAmount(v)} />
        </Form.Item>
      </Form>
      <p>根据信用等级，总额为: {getTotalAmount(price * amount, (info as UserInfo).creditLevel)}</p>
    </Modal>
  </div>
}

const getTotalAmount = (price:number, level:number) => {
  switch(level) {
    case 1:
      return price * 0.9;
    case 2:
    case 3:
      return price * 0.85;
    case 4:
      return price * 0.8;
    case 5:
      return price * 0.75;
  }
}