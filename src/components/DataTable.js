
export default function DataTable({ columns, dataSource, handleTableChange }) {

  const renderTableData = () => {
    return dataSource.map((column, index) => {
       const { key, name, age } = column //destructuring
        return (
          <tr key={index}>
            <td>{key}</td>
            <td>{name}</td>
            <td>{age}</td>
          </tr>
      )
    })
  }

  return (

    <table>
      <thead>
      <tr>
        { columns.map(column => <th key={column.key}>{column.title}</th>)}
      </tr>
      </thead>
      <tbody>
        {renderTableData()}
      </tbody>
      
      {/* <hr />
      {JSON.stringify(dataSource)}
      <hr />
      {JSON.stringify(columns)} */}

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