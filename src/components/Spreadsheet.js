import './Spreadsheet.css';
import { useState, useEffect } from "react";
import ColumnForm from "./ColumnForm";
import DataTable from "./DataTable";
import { Button } from 'antd';

const firstColumn = { title: 'Key', dataIndex: 'key', key: 'key', type: 'text' };

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

export default function Spreadsheet() {
  const [columns, setColumns] = useState(localStorage.getObj('columns') || [firstColumn]);
  const [dataSource, setDataSource] = useState(localStorage.getObj('rows') || []);
  const [idNewRow, setIdNewRow] = useState(dataSource.length + 1);
  // const [newRow, setNewRow] = useState({key: (dataSource.length + 1)})

  useEffect(() => {
    console.log(columns)
    if (columns.length === 1) addRow(10);
    localStorage.setObj('columns', columns)
  }, [columns])

  useEffect(() => {
    localStorage.setObj('rows', dataSource)
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

      console.log(newRow)
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