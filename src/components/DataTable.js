import './DataTable.css'
import { useState, useEffect } from "react";
import { Input, InputNumber, Select, DatePicker, Space } from 'antd';
const { Option } = Select;

export default function DataTable({ columns, dataSource }) {
  const [editableRow, setEditableRow] = useState({});
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  });

  const onEdit = ({id, currentUnitPrice}) => {
    setInEditMode({
      status: true,
      rowKey: id
    })
    // setUnitPrice(currentUnitPrice);
  }

  const onSave = ({id, newUnitPrice}) => {
    // updateInventory({id, newUnitPrice});
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null
    })
    // reset the unit price state value
    // setUnitPrice(null);
  }

  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
  }

  const handleChangeInput = (value) => {
    console.log('changed', value);
  }

  const handleChangeDate = (date, dateString) => {
    console.log(date, dateString);
  }

  const EditRow = ({ column, rowData }) => {
    return (
      <td key={column.key}>
        <button onClick={() => onEditRow(rowData)}>Edit</button> {rowData[`${column.key}`]}
      </td>
    )
  }

  const onEditRow = (rowData) => {
    setEditableRow(rowData);
    setInEditMode({...inEditMode, rowKey: rowData.key})
    
  }

  const SimpleRow = ({ column, rowData }) => {
    console.log(JSON.stringify(rowData));
    console.log(rowData.key === inEditMode.rowKey)
    console.log(rowData.key, inEditMode.rowKey)
    let changeDisplay = (rowData.key === inEditMode.rowKey) ? true : false;

    switch (column.type) {
      case 'text':
        return (
          <td key={column.key}>
          { changeDisplay 
            ? rowData[`${column.key}`]
            : <Input placeholder="Basic usage" onChange={handleChangeInput} />
          }
          </td>
        )
      case 'number':
        return (
          <td key={column.key}>
            { changeDisplay 
              ? rowData[`${column.key}`]
              : <InputNumber onChange={handleChangeInput} />
            }
          </td>
        )
      case 'select':
        return (
          <td key={column.key}>
            { changeDisplay 
              ? rowData[`${column.key}`]
              : <Select defaultValue="lucy" onChange={handleChangeSelect}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
            }
          </td>
        )
        
      case 'date':
        return (
          <td key={column.key}>
          { changeDisplay
            ? rowData[`${column.key}`]
            : <Space direction="vertical">
              <DatePicker onChange={handleChangeDate} />
            </Space>
          }
          </td>
        )
      default:
        return (
          <td key={column.key}>
          { changeDisplay 
            ? rowData[`${column.key}`]
            : <Input placeholder="Basic usage" onChange={handleChangeInput} />
          }
          </td>
        )
    }

  }

  const renderTableData = () => {
    return dataSource.map((rowData, index) => {
      return (
        <tr key={index}>
          { columns.map(column => {
            return column.key === 'key' ?
              <EditRow column={column} rowData={rowData}></EditRow>
              :
              <SimpleRow column={column} rowData={rowData}></SimpleRow>
            // return <td key={column.key}>{columnData[`${column.key}`]}</td>
          })}
        </tr>
      )
    })
  }



  return (

    <table id="data-table">
      <thead>
      <tr>
        { columns.map(column => <th key={column.key}>{column.title}</th>)}
      </tr>
      </thead>
      <tbody>
        {renderTableData()}
      </tbody>
    </table>
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