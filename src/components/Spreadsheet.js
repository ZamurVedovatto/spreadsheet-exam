import { useState, useEffect } from "react";
import ColumnForm from "./ColumnForm";
import DataTable from "./DataTable";

const firstColumn = { title: 'Key', dataIndex: 'key', key: 'key', type: 'text' };
const secondColumn = { title: 'Name', dataIndex: 'name', key: 'name', type: 'text' };
const thirdColumn = { title: 'Age', dataIndex: 'age', key: 'age', type: 'number' };
const fourthColumn = { title: 'Birthday', dataIndex: 'birthday', key: 'birthday', type: 'date' };
const fifthColumn = { title: 'Gender', dataIndex: 'gender', key: 'gender', type: 'select' };

export default function Spreadsheet() {
  const [columns, setColumns] = useState([firstColumn, secondColumn, thirdColumn, fourthColumn, fifthColumn]);
  const [dataSource, setDataSource] = useState([
    {key: '1', name: 'Mike', age: 11, birthday: '2021-01-13', gender: 'M'},
    {key: '2', name: 'Jonh', age: 22, birthday: '2021-01-13', gender: 'F'},
    {key: '3', name: 'AAAA', age: 11, birthday: '2021-01-13', gender: 'M'},
    {key: '4', name: 'BBBB', age: 11, birthday: '2021-01-13', gender: 'F'}
  ])

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
    let newOne = {key: '3', name: 'John', age: 123, asas: 'asas'};
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