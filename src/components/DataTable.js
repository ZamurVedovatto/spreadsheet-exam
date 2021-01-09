import { Table } from 'antd';

export default function DataTable({ columns, dataSource, handleTableChange }) {
  return (
    <Table 
      size="small"
      title={() => 'Header'}
      footer={() => 'Footer'}
      dataSource={dataSource}
      columns={columns}
      onChange={handleTableChange}
      pagination={{ pageSize: 50 }} scroll={{ y: 500 }}
    />
  )
}








  // const dataSource = [
  //   {
  //     key: '1',
  //     name: 'Mike',
  //     age: 32,
  //     address: '10 Downing Street',
  //   },
  //   {
  //     key: '2',
  //     name: 'John',
  //     age: 42,
  //     address: '10 Downing Street',
  //   },
  // ];
  
  // const columns = [
  //   {
  //     title: '',
  //     dataIndex: 'key',
  //     key: 'key'
  //   },
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //     key: 'age',
  //   },
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     key: 'address',
  //   },
  // ];