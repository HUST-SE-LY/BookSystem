import { Button, Form, Input, InputNumber, InputTag, Message } from "@arco-design/web-react";
import { useState } from "react";
import { supplierAddSupply } from "../../../utils/requests/supplier";

export const AddSupply = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [publisher, setPublisher] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const addSupply = () => {
    if(!title || !price ||!publisher || !amount || !authors.length || !keywords.length) {
      Message.error("请输入完整信息");
      return;
    }
    if(price <= 0) {
      Message.error("单价必须大于0")
      return;
    }
    if(amount <= 0) {
      Message.error("供书数量必须大于0")
      return;
    }
    supplierAddSupply({title, price, publisher, amount, authors, keywords}).then(() => {
      Message.success("发布成功！")
      setTitle("");
      setPrice(0);
      setAmount(0);
      setKeywords([])
      setPublisher("");
      setAuthors([])
    })
    
  }
  return (
    <div className="p-[16px_32px] w-[400px]">
      <p className="text-xl font-bold">发布供书</p>
      <Form layout="vertical">
        <Form.Item label="书名" required>
          <Input value={title} onChange={(v) => setTitle(v)} />
        </Form.Item>
        <Form.Item label="出版商" required>
          <Input value={publisher} onChange={(v) => setPublisher(v)} />
        </Form.Item>
        <Form.Item label="单价" required>
          <InputNumber value={price} onChange={(v) => setPrice(v)} prefix="¥" />
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
      <Button type="primary" onClick={addSupply}>提交</Button>
    </div>
  );
};
