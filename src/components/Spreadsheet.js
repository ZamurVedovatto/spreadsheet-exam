import { useState, useEffect } from "react";
import ColumnForm from "./ColumnForm";
import DataTable from "./DataTable";

const firstColumn = { title: 'Key', dataIndex: 'key', key: 'key', type: 'text' };
const secondColumn = { title: 'Name', dataIndex: 'name', key: 'name', type: 'number' };
const thirdColumn = { title: 'Age', dataIndex: 'age', key: 'age', type: 'select' };
const fourthColumn = { title: 'Age', dataIndex: 'age', key: 'age', type: 'date' };

export default function Spreadsheet() {
  const [columns, setColumns] = useState([firstColumn, secondColumn, thirdColumn, fourthColumn]);
  const [dataSource, setDataSource] = useState([{key: '1', name: 'Mike', age: 11, asas: 'asas'}, {key: '3', name: 'John', age: 22, asas: 'asas'}]);

  useEffect(() => {
    checkRows();
  }, [columns]);

  useEffect(() => {
    fillDataSource();
  }, [dataSource]);

  const onAddColumn = (newColumn) => {
    newColumn.key = newColumn.title.replace(/ /g,'-');
    setColumns([...columns, newColumn]);
  }

  const checkRows = () => {
    if (columns.length === 2) onAddRows(10);
  }

  const onAddRows = (amount) => {
  }

  const fillDataSource = () => {
    console.log(dataSource);
  }

  const addOne = () => {
    let newOne = {key: '1', name: 'John', age: 123, asas: 'asas'};
    setDataSource([...dataSource, newOne ])
  }

  return (
    <>
      <ColumnForm onAddColumn={onAddColumn}></ColumnForm>
      <span>{JSON.stringify(columns)}</span>
      <button onClick={addOne}>addone</button>
      <hr />
      <DataTable
        columns={columns}
        dataSource={dataSource}
      ></DataTable>
      <hr />
      <button onClick={addOne}>add 10 rows</button>
    </>
  )
}