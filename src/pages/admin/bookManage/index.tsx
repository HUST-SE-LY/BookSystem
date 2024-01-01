/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Author, Keyword } from "../../supplier/supply";
import { adminGetBooks, adminSetPrice, adminStartSaleBook, adminUnSaleBook } from "../../../utils/requests/admin";
import {
  Button,
  InputNumber,
  Message,
  Modal,
  Table,
  TableColumnProps,
  Tag,
} from "@arco-design/web-react";

export interface SingleBook {
  id: number;
  title: string;
  publisher: string;
  price: number;
  amount: number;
  coverImage: string;
  purchasePrice: number;
  contents: string;
  stockLocation: string;
  onSale: boolean;
  Authors: Author[];
  Keywords: Keyword[];
}

export const BookManage = () => {
  const [list, setList] = useState<SingleBook[]>([]);
  const [id, setId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [price, setPrice] = useState(0);
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
      title: '批发价',
      dataIndex: 'purchasePrice',
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
      title: "设置价格",
      render: (_data, item: SingleBook) => {
        const openModal = () => {
          setId(item.id);
          setPrice(item.purchasePrice);
          setVisible(true);
        };
        return <Button onClick={openModal}>设置</Button>;
      },
    },
    {
      title: "上架",
      render: (_data, item: SingleBook) => {
        const setSale = () => {
          adminStartSaleBook({id: item.id}).then(() => {
            Message.success("上架成功");
            setList((prev) => prev.map((el) => {
              el.id === item.id && (el.onSale = true)
              return el;
            }))
          })
        }
        const setUnsale = () => {
          adminUnSaleBook({id: item.id}).then(() => {
            Message.success("下架成功");
            setList((prev) => prev.map((el) => {
              el.id === item.id && (el.onSale = false)
              return el;
            }))
          })
        }
        return item.onSale ? (
          <Button onClick={setUnsale} status="danger">下架</Button>
        ) : (
          <Button onClick={setSale} type="primary">上架</Button>
        );
      },
    },
  ];
  const updatePrice = () => {
    adminSetPrice({
      id,
      price,
    }).then(() => {
      Message.success("修改成功");
      setList((prev) =>
        prev.map((el) => {
          el.id === id && (el.price = price);
          return el;
        })
      );
      setVisible(false);
    });
  };
  useEffect(() => {
    adminGetBooks()
      .then((res) => {
        setList(res.books);
      })
      .catch(() => {
        Message.error("获取存书失败");
      });
  }, []);
  return (
    <div className="p-[16px_32px]">
      <p className="text-xl font-bold">现有图书</p>
      <Table data={list} rowKey="id" columns={columns} />
      <Modal
        onOk={updatePrice}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <div className="flex gap-[8px] w-[12em]">
          <InputNumber
            value={price}
            onChange={(v) => setPrice(v)}
            prefix="¥"
            size="small"
          />
        </div>
      </Modal>
    </div>
  );
};
