import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import columns from '../../Component_JSON/EmployeeList';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeListGridComponent.scss';
import 'ag-grid-enterprise';


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
    }];

    return (
        <div className="ag-theme-alpine employee-List-grid" >
            <AgGridReact rowData={data} columnDefs={columns}
                domLayout="autoHeight"
                defaultColDef={{
                    flex: 1,
                    minWidth: 150,
                    resizable: true,

                }}
                // onGridReady={onGridReady}

                // sideBar='columnss'
                hiddenByDefault={false}
                rowGroupPanelShow='always'
                pivotPanelShow='always'
                sideBar={{
                    toolPanels: [
                        {
                            id: 'columns',
                            labelDefault: 'Columns',
                            labelKey: 'columns',
                            iconKey: 'columns',
                            toolPanel: 'agColumnsToolPanel',
                            toolPanelParams: {
                                suppressRowGroups: true,
                                suppressValues: true,
                                suppressPivots: false, suppressPivotMode: true,
                                suppressColumnFilter: true,
                                suppressColumnSelectAll: true,
                                suppressColumnExpandAll: true,
                            }
                        }
                    ]
                }}
                // sideBar={true}
                defaultToolPanel='columns'
                pagination={true}
                paginationPageSize={8} />
        </div>

    )
}

export default Grid;
