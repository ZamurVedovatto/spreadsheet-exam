import { Row, Col, Form, Input, Select, Button, Checkbox, Card, List, Typography } from 'antd';
import { useState } from 'react';
const { Option } = Select;

// form default values
const initialValues = {
  type: 'text',
  title: 'New Column',
  required: true
}

const columnTypes = [
  { type: "date", label: "Date" },
  { type: "select", label: "Select" },
  { type: "text", label: "Text" },
  { type: "number", label: "Number" },
]

export default function ColumnForm({ onAddColumn }) {
  const [form] = Form.useForm(); // https://ant.design/components/form/#FormInstance
  const [option, setOption] = useState({ show: false, value: "" });
  const [selectOptions, setSelectOptions] = useState([]);
  
  // check if show or not the Select options 
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

  // form submited succesfully
  const onFinish = (values) => {
    if (values.type === 'select') {
      if (selectOptions.length === 0) {
        return;
      }
      values.options = selectOptions;
    } 
    onAddColumn(values);
    onReset();
  };

  // form submited with errors
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // reset form after submit
  const onReset = () => {
    form.resetFields();
    setOption({ show: false, value: "" });
  };

  // set new values based on input changes
  const handleOption = (evt) => {
    let value = evt.target.value;
    setOption({ ...option, value });
  }

  // add new option (type Select)
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
