import './DataTable.css'
import { useState, useEffect } from "react";
import { Input, InputNumber, Select, DatePicker, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
const { Option } = Select;

export default function DataTable({ columns, dataSource, changeHeaderTitle, changeItemOnData }) {
  const [editableHeader, setEditableHeader] = useState({});
  const [inEditModeHeader, setInEditModeHeader] = useState({
    status: false,
    headerKey: null
  });

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
    onCancel('row');
  }

  const onSaveHeader = () => {
    let headerTochange = columns.findIndex(function(column) { 
      return column.key == editableHeader.key; 
    });
    changeHeaderTitle(headerTochange, editableHeader);
    onCancel('header');
  }

  const onCancel = (type) => {
    switch (type) {
      case 'row':
        setInEditMode({
          status: false,
          rowKey: null
        })
        break;
      case 'header':
        setInEditModeHeader({
          status: false,
          headerKey: null
        })
        break;
      default:
        break;
    }
  }

  const handleChange = (value, columnKey) => {
    setEditableRow({...editableRow, [columnKey]: value});
  }

  const handleChangeHeader = (value, headerKey) => {
    console.log(value, headerKey)
    setEditableHeader({...editableHeader, title: value});
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








  


  const onEditHeader = (header) => {
    console.log(header)
    setEditableHeader(header);
    setInEditModeHeader({...inEditModeHeader, status: true, headerKey: header.key});
  }

  const renderTableHeader = () => {

    return columns.map((header, index) => {
      let changeVisualization = (header.key === inEditModeHeader.headerKey) && inEditModeHeader.status;
      return (
        <th key={header.key}>
          {
            !changeVisualization
            ? <> {header.title} <EditOutlined onClick={() => onEditHeader(header)} /> </>
            : 
            <>
              <Input onChange={e => handleChangeHeader(e.target.value, header.key)} value={header.title} />
              <div>
                <button onClick={onSaveHeader}>Save</button>
                <button onClick={onCancel}>Cancel</button>
              </div>
            </>
          }
          </th>
      )
    })
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
          })}
        </tr>
      )
    })
  }



  return (
    <table id="data-table">
      <thead>
      <tr>
        {renderTableHeader()}
      </tr>
      </thead>
      <tbody>
        {renderTableData()}
      </tbody>
    </table>
  )
}