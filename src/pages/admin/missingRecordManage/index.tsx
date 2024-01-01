import { useEffect, useState } from "react";
import { AdminSupply, Supplier } from "../supplies";
import {
  adminAddPurchaseRecord,
  adminChangeMissingRecord,
  adminGetMissingRecords,
} from "../../../utils/requests/admin";
import { Author, Keyword } from "../../supplier/supply";
import {
  Button,
  Form,
  InputNumber,
  Message,
  Modal,
  Table,
  TableColumnProps,
  Tag,
} from "@arco-design/web-react";

export interface SingleMissingRecord {
  id: number;
  amount: number;
  Supply: AdminSupply;
  purchase: boolean;
}

export const MissingRecordManage = () => {
  const [list, setList] = useState<SingleMissingRecord[]>([]);
  const [id, setId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [visible, setVisible] = useState(false);
  const columns: TableColumnProps[] = [
    {
      title: "书名",
      dataIndex: "Supply.title",
    },
    {
      title: "单价",
      dataIndex: "Supply.price",
    },
    {
      title: "预购量",
      dataIndex: "amount",
    },
    {
      title: "作者",
      dataIndex: "Supply.Authors",
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
      dataIndex: "Supply.Keywords",
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
      title: "生成订单",
      render: (_data: number, item: SingleMissingRecord) => {
        const purchase = () => {
          adminAddPurchaseRecord({
            amount: item.amount,
            missingRecordId: item.id,
          })
            .then(() => {
              Message.success("下单成功！");
              setList((prev) =>
                prev.map((el) => {
                  el.id === item.id && (el.purchase = true);
                  return el;
                })
              );
            })
            .catch(() => {
              Message.error("下单失败");
            });
        };
        return (
          <>
            {item.purchase ? (
              <p>已下单</p>
            ) : (
              <Button type="primary" size="small" onClick={purchase}>
                下单
              </Button>
            )}
          </>
        );
      },
    },
    {
      title: "修改",
      render: (_data: number, item: SingleMissingRecord) => {
        const openModal = () => {
          setId(item.id);
          setVisible(true);
        };
        return (
          <>
            {
              !item.purchase ?
              <Button onClick={openModal} size="small" type="primary">
                修改
              </Button> : <p>下单后不能修改</p>
            }
          </>
        );
      },
    },
  ];
  const expandColumns: TableColumnProps[] = [
    {
      title: "供货商",
      dataIndex: "name",
    },
    {
      title: "供货地址",
      dataIndex: "address",
    },
    {
      title: "供货电话",
      dataIndex: "phone",
    },
  ];

  const changeAmount = () => {
    if (amount <= 0) {
      Message.error("登记数必须大于0");
      return;
    }
    adminChangeMissingRecord({ id, amount }).then(() => {
      Message.success("成功修改");
      setList((prev) =>
        prev.map((el) => {
          if (el.id === id) {
            el.amount = amount;
          }
          return el;
        })
      );
      setVisible(false);
    });
  };

  useEffect(() => {
    adminGetMissingRecords().then((res) => {
      setList(res.records);
    });
  }, []);

  const expandRowRender = (item: Supplier) => {
    return (
      <Table
        rowKey="name"
        columns={expandColumns}
        data={[item]}
        pagination={false}
      />
    );
  };

  return (
    <div className="p-[16px_32px]">
      <p className="text-xl font-bold">缺书登记</p>
      <Table
        data={list}
        rowKey="id"
        expandedRowRender={(record) => expandRowRender(record.Supply.Supplier)}
        columns={columns}
      />
      <Modal
        onOk={changeAmount}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Form className="mt-[8px]">
          <Form.Item label="登记数量" required>
            <InputNumber value={amount} onChange={(v) => setAmount(v)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
