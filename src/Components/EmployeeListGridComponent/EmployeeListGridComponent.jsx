import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link } from 'react-router-dom';
import data from '../../Component_JSON/EmployeeList';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeListGridComponent.scss';
import CustomElements from './CustomElement.jsx';



const Grid = () => {
    
    const [searchText, setSearchText] = useState('');
    const [rowData, setRowData] = useState();
    const columnsList = ['First Name', 'Last Name', 'Email Id', 'Phone', 'DOB','Employee Id', 'Designation','startDate','endDate'
        ,'Employment Type', 'SSN', 'Gender'];

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/employees/getAllEmployees')
            .then(response => response.json())
            .then(data => {
                setRowData(getFlattenedData(data));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getFlattenedData = (data) => {
        let updatedData = data.map((dataObj) => {
            //return { ...dataObj, ...dataObj.employeeAddress[0], ...dataObj.employeeAssignments[0] }
            return { ...dataObj }
        });
        return updatedData || [];
    }

    const getColumnsDefList = (columnsList, isSortable, isEditable, hasFilter) => {
        let columns = columnsList.map((column) => {
            let fieldValue = column.split(' ').join('')
            fieldValue = fieldValue[0].toLowerCase() + fieldValue.slice(1);
            if (fieldValue.toLowerCase() === 'ssn' || fieldValue.toLowerCase() === 'dob') {
                fieldValue = fieldValue.toLowerCase();
            }

            let updatedColumn = column === 'DOB' ? 'Date of Birth' : column
            updatedColumn = column
            if(column == 'startDate' )
                updatedColumn='Employment Start Date';
            else if(column == 'endDate')
                updatedColumn='Employment End Date';
   
                return {
                    headerName: updatedColumn,
                    field: fieldValue,
                    sortable: isSortable,
                    editable: true,
                    filter: 'agTextColumnFilter',
                    cellRenderer: (params) => {
                        if (column === 'First Name' || column === 'Last Name') {
                            return (
                                <Link
                                    to={{
                                        pathname: '/employeeFullDetails',
                                        state: { rowData: params.data }
                                    }}
                                >
                                    {params.value}
                                </Link>
                            );
                        } else {
                            return params.value;
                        }
                    }
                };
            });
            return columns;
        };

        const handleSearchInputChange = (event) => {
            setSearchText(event.target.value);
          };
      
          const filterData = () => {
            if (!searchText) {
              return rowData;
            }
      
            return rowData.filter((row) =>
              Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchText.toLowerCase())
              )
            );
            };

    return (
        <div className="ag-theme-alpine employee-List-grid" >
            <div class="container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearchInputChange}
                    />
                    <button type="primary" className='button ' onClick={filterData}>Search</button>
                </div>
            <AgGridReact rowData={filterData()} columnDefs={getColumnsDefList(columnsList, true, false)}
                domLayout="autoHeight"
                defaultColDef={{
                    flex: 1,
                    minWidth: 150,
                    resizable: true,
                    filter: false,
                    floatingFilter: false
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
                sortable={true}
                defaultToolPanel='columns'
                pagination={true}
                paginationPageSize={8} />
        </div>
    )
}

export default Grid;
