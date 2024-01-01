import { useEffect, useState } from "react";
import { Author, Keyword, SingleSupply } from "../../supplier/supply";
import { adminAddMissingRecord, adminGetSupplies } from "../../../utils/requests/admin";
import { Button, Form, InputNumber, Message, Modal, Table, TableColumnProps, Tag } from "@arco-design/web-react";

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  address: string;
}

export interface AdminSupply extends SingleSupply {
  Supplier: {
    id: number;
    name: string;
    phone: string;
    address: string;
  };
}

export const Supplies = () => {
  const [list, setList] = useState<AdminSupply[]>([]);
  const [supplyId, setSupplyId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(0)
  const columns: TableColumnProps[] = [
    {
      title: "书名",
      dataIndex: "title",
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
      title: '缺书登记',
      render:(_data, item:AdminSupply) => {
        const openModal = () => {
          setVisible(true);
          setSupplyId(item.id)
        }
        return <Button onClick={openModal} size="small" type="primary">登记</Button>
      }
    }
    
  ];
  const expandColumns: TableColumnProps[] = [
    {
      title: "供货商",
      dataIndex:'name'
    },
    {
      title: "供货地址",
      dataIndex: 'address'
    },
    {
      title: "供货电话",
      dataIndex: 'phone'
    },
  ];
  const addMissingRecord = () => {
    if(amount <= 0) {
      Message.error("登记数量必须大于0");
      return
    }
    adminAddMissingRecord({
      amount,
      supply_id: supplyId
    }).then(() => {
      Message.success("生成缺书记录成功");
      setVisible(false)
    }).catch(() => {
      Message.error("生成缺书记录失败")
    })
   
  }
  useEffect(() => {
    adminGetSupplies().then((res) => {
      setList(res.supplies);
    });
  }, []);

  const expandRowRender = (item: Supplier) => {
    return <Table rowKey="name" columns={expandColumns} data={[item]} pagination={false} />;
  };

  return (
    <div className="p-[16px_32px]">
      <p className="text-xl font-bold">供货商供货信息</p>
      <Table data={list} rowKey="id" expandedRowRender={(record) => expandRowRender(record.Supplier)} columns={columns} />
      <Modal onOk={addMissingRecord} visible={visible} onCancel={() => setVisible(false)}>
        <Form className="mt-[8px]">
          <Form.Item label="登记数量" required>
            <InputNumber value={amount} onChange={(v) => setAmount(v)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
