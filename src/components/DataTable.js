import './DataTable.css'

export default function DataTable({ columns, dataSource }) {

  const renderTableData = () => {
    return dataSource.map((columnData, index) => {
        const { key, name, age } = columnData;
        return (
          <tr key={index}>
            { columns.map(column => <td key={column.key}>{columnData[`${column.key}`]}</td>)}
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