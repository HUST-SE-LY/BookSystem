import { useEffect, useState } from "react";
import {
  supplierChangeSupply,
  supplierDeleteSupply,
  supplierGetSupplies,
} from "../../../utils/requests/supplier";
import {
  Button,
  Form,
  Input,
  InputNumber,
  InputTag,
  Message,
  Modal,
  Table,
  TableColumnProps,
  Tag,
} from "@arco-design/web-react";

export interface Author {
  id: number;
  name: string;
}

export interface Keyword {
  id: number;
  content: string;
}

export interface SingleSupply {
  id: number;
  title: string;
  publisher: string;
  price: number;
  amount: number;
  Authors: Author[];
  Keywords: Keyword[];
  supplier_id: number;
}

export const MySupplies = () => {
  const [id, setId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState<SingleSupply[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [publisher, setPublisher] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const column: TableColumnProps[] = [
    {
      title: "书名",
      dataIndex: "title",
    },
    {
      title: "出版商",
      dataIndex: "publisher",
    },
    {
      title: "单价",
      dataIndex: "price",
    },
    {
      title: "数量",
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
      title: "更新数据",
      render: (
        _data: number,
        { id, title, amount, price, publisher, Authors, Keywords }: SingleSupply
      ) => {
        const openModal = () => {
          setTitle(title);
          setAmount(amount);
          setPrice(price);
          setPublisher(publisher);
          setAuthors(Authors.map((el) => el.name));
          setKeywords(Keywords.map((el) => el.content));
          setId(id);
          setVisible(true);
        };
        return <Button onClick={openModal}>修改</Button>;
      },
    },
    {
      title: "删除",
      dataIndex: "id",
      render: (data: number) => {
        const deleteSupply = () => {
          supplierDeleteSupply({ id: data })
            .then(() => {
              Message.success("删除成功");
              setList((prev) => prev.filter((el) => el.id !== data));
            })
            .catch(() => {
              Message.error("删除失败");
            });
        };
        return (
          <Button onClick={deleteSupply} status="danger">
            删除
          </Button>
        );
      },
    },
  ];
  const changeSupply = () => {
    supplierChangeSupply({
      id,
      title,
      price,
      amount,
      publisher,
      authors,
      keywords,
    }).then((res) => {
      Message.success("修改成功");
      setVisible(false);
      const newList = list.map((el) => {
        if (el.id === id) {
          el = res.supply;
        }
        return el;
      });
      setList(newList);
    });
  };
  useEffect(() => {
    supplierGetSupplies().then((res) => {
      setList(res.supplies);
    });
  }, []);
  return (
    <div className="p-[16px_32px]">
      <p className="text-xl font-bold">我的供书</p>
      <Table data={list} rowKey={"id"} columns={column} />
      <Modal
        onOk={changeSupply}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="书名" required>
            <Input value={title} onChange={(v) => setTitle(v)} />
          </Form.Item>
          <Form.Item label="出版商" required>
            <Input value={publisher} onChange={(v) => setPublisher(v)} />
          </Form.Item>
          <Form.Item label="单价" required>
            <InputNumber
              value={price}
              onChange={(v) => setPrice(v)}
              prefix="¥"
            />
          </Form.Item>
          <Form.Item label="数量" required>
            <InputNumber value={amount} onChange={(v) => setAmount(v)} />
          </Form.Item>
          <Form.Item label="作者" required>
            <InputTag
              value={authors}
              onChange={(v) => {
                v.length <= 4 && setAuthors(v);
              }}
              placeholder="回车添加作者，最多4个"
            />
          </Form.Item>
          <Form.Item label="关键词" required>
            <InputTag
              value={keywords}
              onChange={(v) => {
                v.length <= 10 && setKeywords(v);
              }}
              placeholder="回车添加关键词，最多10个"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
