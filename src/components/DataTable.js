import './DataTable.css'
import { useState, useEffect } from "react";

export default function DataTable({ columns, dataSource }) {
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

  const KeyRow = ({ column, columnData }) => {
    return <td key={column.key}><button style={{ marginRight: '1rem' }} onClick={onEdit}>edit</button> {columnData[`${column.key}`]}</td>
  }

  const SimpleRow = ({ column, columnData }) => {
    return <td key={column.key}>{columnData[`${column.key}`]}</td>
  }

  const renderTableData = () => {
    return dataSource.map((columnData, index) => {
      return (
        <tr key={index}>
          { columns.map(column => {
            return column.key === 'key' ? <KeyRow column={column} columnData={columnData}></KeyRow> : <SimpleRow column={column} columnData={columnData}></SimpleRow>
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