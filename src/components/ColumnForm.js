import './ColumnForm.css';
import { Form, Input, Select, Button, Checkbox, Card } from 'antd';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const initialValues = {
  type: 'text',
  tile: 'New Column',
  required: true,
}

const columnTypes = [
  { type: "date", label: "Date" },
  { type: "select", label: "Select" },
  { type: "text", label: "Text" },
  { type: "number", label: "Number" },
]

export default function ColumnForm({ onAddColumn }) {
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    onAddColumn(values);
    console.log('Success:', values);
    onReset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="new-column__wrapper">
      <Card size="small" title="New Column" className="new-column__card">
        <Form {...layout} form={form} name="column-form" initialValues={initialValues} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input column\'s title!'}]}>
            <Input placeholder="Column's title" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select column\'s type!'}]}>
            <Select>
              { columnTypes.map((column) => <Option key={column.type} value={column.type}>{column.label}</Option>) }
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout} name="required" valuePropName="checked">
            <Checkbox checked>Requried</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};