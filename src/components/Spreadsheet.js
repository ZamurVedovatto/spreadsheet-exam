import { useState, useEffect } from "react";
import ColumnForm from "./ColumnForm";
import DataTable from "./DataTable";

const firstColumn = { title: 'Key', dataIndex: 'key', key: 'key' };
const secondColumn = { title: 'Name', dataIndex: 'name', key: 'name' };
const thirdColumn = { title: 'Age', dataIndex: 'age', key: 'age' };

export default function Spreadsheet() {
  const [columns, setColumns] = useState([firstColumn, secondColumn, thirdColumn]);
  const [dataSource, setDataSource] = useState([{key: '1', name: 'Mike', age: 11}, {key: '3', name: 'John', age: 22}]);

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
    // let newDataSource = [...dataSource];
    // for (let index = 0; index < amount; index++) {
    //   const element = { key: (index+2).toString(), name: 'Mike', };
    //   newDataSource.push(element);
    // }
    // console.log(newDataSource)
    // setDataSource([...dataSource, newDataSource])
  }

  const fillDataSource = () => {
    // columns.forEach(column => {
    //   console.log(column.key);
    // })
    console.log(dataSource);
  }

  const handleTableChange = () => {
    console.log(dataSource)
  }

  //   {
  //     key: '1',
  //     name: 'Mike',
  //     age: 32,
  //     address: '10 Downing Street',
  //   },

  const addOne = () => {
    let newOne = {key: '1', name: 'John'};
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
        handleTableChange={handleTableChange}  
      ></DataTable>
    </>
  )
}