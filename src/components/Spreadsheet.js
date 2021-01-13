import './Spreadsheet.css';
import { useState, useEffect } from "react";
import ColumnForm from "./ColumnForm";
import DataTable from "./DataTable";
import { Button } from 'antd';

const firstColumn = { title: 'Key', dataIndex: 'key', key: 'key', type: 'text' };

// Storage.prototype.setObj = function(key, obj) {
//   return this.setItem(key, JSON.stringify(obj))
// }
// Storage.prototype.getObj = function(key) {
//   return JSON.parse(this.getItem(key))
// }
// localStorage.getObj('columns')
// localStorage.setObj('columns', columns)

export default function Spreadsheet() {
  const [columns, setColumns] = useState([firstColumn]);
  const [dataSource, setDataSource] = useState([]);
  const [idNewRow, setIdNewRow] = useState(1);

  useEffect(() => {
    if (columns.length === 1) addRow(1);
  }, [columns])

  useEffect(() => {
  }, [dataSource])

  const onAddColumn = (newColumn) => {
    newColumn.key = newColumn.title.replace(/ /g,'-');
    setColumns([...columns, newColumn]);
  }

  const addRow = (amount) => {
    for (let index = 0; index < amount; index++) {
      let newRow = {};
      columns.forEach(column => {
        newRow[column.key] = null;
      })
      newRow['key'] = idNewRow;
      setIdNewRow(idNewRow + 1);
      setDataSource([...dataSource, newRow]);
    }
  }

  const changeItemOnData = (index, row) => {
    let newArr = [...dataSource];
    newArr[index] = row;
    setDataSource(newArr);
  }

  const changeHeaderTitle = (index, header) => {
    let newArr = [...columns];
    newArr[index] = header;
    setColumns(newArr);
  }

  return (
    <div className="spreadsheet-wrapper">
      <ColumnForm onAddColumn={onAddColumn}></ColumnForm>
      {
        (columns.length > 1) &&
        <div>
          <DataTable
            columns={columns}
            dataSource={dataSource}
            changeHeaderTitle={changeHeaderTitle}
            changeItemOnData={changeItemOnData}
          ></DataTable>
          <div className="spreadsheet__actions">
            <Button onClick={() => addRow(10)}>Add Row</Button>
          </div>

        </div>
      }
    </div>
  )
}