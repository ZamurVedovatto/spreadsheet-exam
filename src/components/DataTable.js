import moment from 'moment';
import './DataTable.css'
import { useState, useEffect } from "react";
import { Input, InputNumber, Select, DatePicker, Space } from 'antd';
const { Option } = Select;

export default function DataTable({ columns, dataSource, changeItemOnData }) {
  const [editableRow, setEditableRow] = useState({});
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  });

  const onSave = () => {
    let rowToChange = dataSource.findIndex(function(row) { 
      return row.key == editableRow.key; 
    });
    changeItemOnData(rowToChange, editableRow);
    onCancel();
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null
    })
  }

  const handleChange = (value, columnKey) => {
    console.log(value, columnKey)
    setEditableRow({...editableRow, [columnKey]: value})
  }

  const EditRow = ({ column, rowData }) => {
    let changeVisualization = (rowData.key === inEditMode.rowKey) && inEditMode.status;
    return (
      <td key={column.key}>
        {
          (changeVisualization)
          ?
          <div>
            <button onClick={onSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
          : <button onClick={() => onEditRow(rowData)}>Edit ({rowData[`${column.key}`]})</button>
        }
      </td>
    )
  }

  const onEditRow = (rowData) => {
    setEditableRow(rowData);
    setInEditMode({...inEditMode, status: true, rowKey: rowData.key})
  }

  const SimpleRow = ({ column, rowData }) => {
    let changeDisplay = (rowData.key === inEditMode.rowKey) ? false : true;
    switch (column.type) {
      case 'text':
        return (
          <td key={column.key}>
          { 
            changeDisplay 
            ? rowData[`${column.key}`]
            : <Input placeholder="" onChange={e => handleChange(e.target.value, column.key)} value={editableRow[`${column.key}`]} />
          }
          </td>
        )
      case 'number':
        return (
          <td key={column.key}>
            { 
              changeDisplay 
              ? rowData[`${column.key}`]
              : <InputNumber onChange={e => handleChange(e, column.key)} value={editableRow[`${column.key}`]} />
            }
          </td>
        )
      case 'select':
        return (
          <td key={column.key}>
            { 
              changeDisplay 
              ? rowData[`${column.key}`]
              : <Select defaultValue={editableRow[`${column.key}`]} onChange={e => handleChange(e, column.key)}>
                  <Option value="M">Male</Option>
                  <Option value="F">Female</Option>
                </Select>
            }
          </td>
        )
        
      case 'date':
        return (
          <td key={column.key}>
          { 
            changeDisplay
            ? rowData[`${column.key}`]
            : <Space direction="vertical">
              <input type="date" onChange={e => handleChange(e.target.value, column.key)} />
            </Space>
          }
          </td>
        )
      default:
        return (
          <td key={column.key}>
          { 
            changeDisplay 
            ? rowData[`${column.key}`]
            : <Input placeholder="Basic usage" onChange={e => handleChange(e.target.value, column.key)} />
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