import React from 'react';
import EmployeeListGridComponent from '../EmployeeListGridComponent/EmployeeListGridComponent';
import './EmployeeListComponent.scss';

const EmployeeListComponent = () => {
  const employeeList = [
    {
      firstName: 'First Name - 1',
      lastName: 'Last name - 1 tayjdbc bscij1',
      email: 'test@gmail.com',
      phone: '1234567891',
      employeeID: '0',
      dob: '10/09/2000',
      currentWorkStatus: 'H1B',
      workAuthStartDate: '11/10/1990',
      workAuthEndDate: '21/11/2020',
      taxTerm: 'W2',
      ssn: 'N/A',
      gender: 'Female',
      render: () => <a href='/'>Delete</a>,
    },
    {
      firstName: 'F2 -asbh -dhsauf -sbfh',
      lastName: 'L2',
      email: 'test@gmail.com',
      phone: '1234567890',
      employeeID: '1',
      dob: '1/09/2000',
      currentWorkStatus: 'H1B',
      workAuthStartDate: '15/10/1990',
      workAuthEndDate: '01/12/2020',
      taxTerm: 'W2',
      ssn: 'N/A',
      gender: 'Male',
      render: () => <a href='/'>Delete</a>,
    },
    {
      firstName: 'F3',
      lastName: 'L3',
      email: 'test@gmail.com',
      phone: '1234567892',
      employeeID: '2',
      dob: '10/11/2000',
      currentWorkStatus: 'F1',
      workAuthStartDate: '01/10/1990',
      workAuthEndDate: '01/11/2020',
      taxTerm: 'W2',
      ssn: 'N/A',
      gender: 'Male',
      render: () => <a href='/'>Delete</a>,
    },
    {
      firstName: 'F4',
      lastName: 'L4',
      email: 'test@gmail.com',
      phone: '1234567893',
      employeeID: '3',
      dob: '20/09/2000',
      currentWorkStatus: 'F1',
      workAuthStartDate: '01/01/1990',
      workAuthEndDate: '01/01/2020',
      taxTerm: 'W2',
      ssn: 'N/A',
      gender: 'Male',
      render: () => <a href='/'>Delete</a>,
    },
    {
      firstName: 'F5',
      lastName: 'L5',
      email: 'test@gmail.com',
      phone: '1234567893',
      employeeID: '5',
      dob: '20/09/2000',
      currentWorkStatus: 'H1B',
      workAuthStartDate: '01/01/1990',
      workAuthEndDate: '01/01/2020',
      taxTerm: 'W2',
      ssn: 'N/A',
      gender: 'Female',
      render: () => <a href='/'>Delete</a>,
    },
    {
      firstName: 'F6',
      lastName: 'L6',
      email: 'test@gmail.com',
      phone: '1234567893',
      employeeID: '6',
      dob: '20/09/2000',
      currentWorkStatus: 'H1B',
      workAuthStartDate: '01/01/1990',
      workAuthEndDate: '01/01/2020',
      taxTerm: 'W2',
      ssn: 'N/A',
      gender: 'Male',
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <div>
      {/* <Header /> */}
      {/* <Table dataSource={employeeList} bordered columns={employeetableColumns}
        scroll={{ x: 500 }}
        className='employee-table'
        pagination={{ pageSize: 4 }}
        onChange={onChange} /> */}
        <EmployeeListGridComponent />
        {/* <Footer /> */}
    </div>
  )
}

export default EmployeeListComponent;

