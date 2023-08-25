import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import data from '../../Component_JSON/EmployeeList';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeListGridComponent.scss';


const Grid = () => {

    const [rowData, setRowData] = useState();
    const columnsList = ['First Name', 'Last Name', 'Email', 'Phone', 'Employee ID', 'Date of Birth', 'Current Work Status',
        'Work Auth Start Date', 'Work Auth End Date', 'Tax Term', 'SSN', 'Gender'];
    useEffect(() => {
        // fetch('http://localhost:8080/api/v1/employees')
        //     .then(response => response.json())
        //     .then(data => setRowData(data))
        //     .catch(error => console.error('Error fetching data:', error));
        setRowData(data);
    }, []);

    const getColumnsDefList = (columnsList, isSortable, isEditable, hasFilter) => {
        let columns = columnsList.map((column) => {
            let fieldValue = column.split(' ').join('')
            fieldValue = fieldValue[0].toLowerCase() + fieldValue.slice(1);
            if (fieldValue.toLowerCase() === 'ssn') {
                fieldValue = fieldValue.toLowerCase();
            }
            return ({ headerName: column, field: fieldValue, sortable: isSortable, editable: isEditable, filter: hasFilter })
        });
        return columns;
    }

    return (
        <div className="ag-theme-alpine employee-List-grid" >
            <AgGridReact rowData={data} columnDefs={getColumnsDefList(columnsList)}
                domLayout="autoHeight"
                defaultColDef={{
                    flex: 1,
                    minWidth: 150,
                    resizable: true,
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
                pagination={true}
                paginationPageSize={8} />
        </div>
    )
}

export default Grid;
