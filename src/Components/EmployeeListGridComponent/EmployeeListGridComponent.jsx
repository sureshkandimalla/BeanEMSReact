import React from "react";
// import { AgGridReact } from "ag-grid-react";
import { AgGridReact } from "react-ag-grid";
// // import "ag-grid-community/dist/styles/ag-grid.css";
// import 'ag-grid-community/dist/ag-grid.css';
// import "ag-grid-community/dist/styles/ag-theme-balham.css";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from "ag-grid-community";
// import { fetchData, fetchLargeData, Athlete } from "./api";


const Grid = () => {
    const data = [{
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
      }]

const columns = [
    {
        headerName: 'First Name', field:'firstName', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'Last Name', field:'lastName', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'Email', field:'email', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'Phone', field:'phone', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'Employee ID', field:'employeeID', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'Date of Birth', field:'dob', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'Current Work Status', field:'currentWorkStatus', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'Work Auth Start Date', field:'workAuthStartDate', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'Work Auth End Date', field:'workAuthEndDate', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'Tax Term', field:'taxTerm', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'SSN', field:'ssn', sortable:true, editable: true, filter:true
    },
    {
        headerName: 'Gender', field:'gender', sortable:true, editable: true, filter:true
    }
]

    return (
        <div className="ag-theme-alpine" style={{height: '250px', width: '600px'}}>
            <AgGridReact rowData={data} columnDefs={columns} />
        </div>
        
    )
}

export default Grid;
