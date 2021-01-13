import { Row, Col, Form, Input, Select, Button, Checkbox, Card, List, Typography, Divider } from 'antd';
import { useState, useEffect } from 'react';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
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
  const [option, setOption] = useState({ show: false, value: "" });
  const [selectOptions, setSelectOptions] = useState([]);
  
  useEffect(() => {
    console.log(selectOptions);
  }, [selectOptions]);

  const onTypeChange = (value) => {
    switch (value) {
      case 'select':
        setOption({ ...option, show: true });
        return;
      default:
        setOption({ ...option, show: false });
        return;
    }
  };

  const onFinish = (values) => {
    console.log(values);
    if (values.type === 'select') {
      if (selectOptions.length === 0) {
        return;
      }
      values.options = selectOptions;
    } 
    onAddColumn(values);
    onReset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
    setOption({ show: false, value: "" });
  };

  const handleOption = (evt) => {
    let value = evt.target.value;
    setOption({ ...option, value });
  }

  const onAddOption = () => {
    setSelectOptions([...selectOptions, option.value]);
    setOption({ show: true, value: "" });
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Row gutter={24}>
        <Col span={12}>
          <Card size="small" title="New Column">
            <Form form={form} name="column-form" initialValues={initialValues} onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input column\'s title!'}]}>
                <Input placeholder="Column's title" />
              </Form.Item>
              <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select column\'s type!'}]}>
                <Select placeholder="Select one option" onChange={onTypeChange}>
                  { columnTypes.map((column) => <Option key={column.type} value={column.type}>{column.label}</Option>) }
                </Select>
              </Form.Item>
              <Form.Item name="required">
                <Checkbox checked>Required</Checkbox>
              </Form.Item>
              <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem 0 0 auto"}}>
                <Button type="primary" htmlType="submit">Submit</Button>
              </div>
            </Form>
          </Card>
        </Col>
        {
          option.show &&
          <Col span={12}>
            <Card size="small" title="Select Options">
              <Form.Item label="Option" name="Option" rules={[{ required: true, message: 'Please input an option' }]}>
                <Input placeholder="Option" value={option} onChange={handleOption} />
              </Form.Item>
              <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem 0"}}>
                <Button type="primary" onClick={onAddOption}>Add</Button>
              </div>
              {
              (selectOptions.length > 0) &&
              <List
                bordered
                dataSource={selectOptions}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text> 
                  </List.Item>
                )}
              />
            }
            </Card>
          </Col>
        }
      </Row>
    </div>
  );
};
