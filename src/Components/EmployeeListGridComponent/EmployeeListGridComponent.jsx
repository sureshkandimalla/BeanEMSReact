import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import data from '../../Component_JSON/EmployeeList';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeListGridComponent.scss';


const Grid = () => {

    const [rowData, setRowData] = useState();
    const columnsList = ['First Name', 'Last Name', 'Email Id', 'Phone', 'dob', 'Designation',
        'Employment Start Date', 'Employment End Date', 'Tax Term', 'SSN', 'Gender'];
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/employees')
            .then(response => response.json())
            .then(data => {
                setRowData(getFlattenedData(data));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getFlattenedData = (data) => {
        let updatedData = data.map((dataObj) => {
            return { ...dataObj, ...dataObj.employeeAddress[0], ...dataObj.employmentDetails[0] }
        });
        return updatedData || [];
    }

    const getColumnsDefList = (columnsList, isSortable, isEditable, hasFilter) => {
        let columns = columnsList.map((column) => {
            let fieldValue = column.split(' ').join('')
            fieldValue = fieldValue[0].toLowerCase() + fieldValue.slice(1);
            if (fieldValue.toLowerCase() === 'ssn') {
                fieldValue = fieldValue.toLowerCase();
            }
            let updatedColumn = column === 'dob' ? 'Date of Birth' : column
            return ({ headerName: updatedColumn, field: fieldValue, sortable: isSortable, editable: isEditable, filter: 'agTextColumnFilter' })
        });
        return columns;
    }

    return (
        <div className="ag-theme-alpine employee-List-grid" >
            <AgGridReact rowData={rowData} columnDefs={getColumnsDefList(columnsList)}
                domLayout="autoHeight"
                defaultColDef={{
                    flex: 1,
                    minWidth: 150,
                    resizable: true,
                    filter: true,
                    floatingFilter: true
                }}
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
                defaultToolPanel='columns'
                pagination={true}
                paginationPageSize={8} />
        </div>
    )
}

export default Grid;
