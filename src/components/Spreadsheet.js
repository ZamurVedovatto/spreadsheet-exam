import { useState } from "react";
import ColumnForm from "./ColumnForm";
import DataTable from "./DataTable";

const firstColumn = { title: '', dataIndex: 'key', key: 'key' };

export default function Spreadsheet() {
  const [columns, setColumns] = useState([firstColumn]);
  const [dataSource, setDataSource] = useState([]);

  const onAddColumn = (newColumn) => {
    newColumn.key = newColumn.title.replace(/ /g,'-');
    setColumns(columns => [...columns, newColumn]);
  }

  return (
    <>
      <ColumnForm onAddColumn={onAddColumn}></ColumnForm>
      <span>{JSON.stringify(columns)}</span>
      <hr />
      <DataTable columns={columns} dataSource={dataSource}></DataTable>
    </>
  )
}