import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import data from '../../Component_JSON/EmployeeList';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './ActiveInvoiesListGridComponent.scss';



const Grid = () => {

    const [rowData, setRowData] = useState();
    const columnsList = ['InvoiceId', 'startDate', 'endDate', 'Hours', 'Total','invoiceDate', 'Status','paymentDate'];
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/activeInvoices/202303')
            .then(response => response.json())
            .then(data => {
                setRowData(getFlattenedData(data));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getFlattenedData = (data) => {
        let updatedData = data.map((dataObj) => {
            return { ...dataObj, ...dataObj.assignment[0] }
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
                updatedColumn='Employment Start Date'
            else if(column == 'invoiceDate')
                updatedColumn = 'Invoice Date'
            else if(column == 'paymentDate')
                updatedColumn = 'Payment Date'
            else if(column == 'endDate')
                updatedColumn='Employment End Date'

            return ({ headerName: updatedColumn,
                        field:  fieldValue, sortable: isSortable, editable: true, filter: 'agTextColumnFilter' })
        });
        return columns;
    }



    return (
        <div className="ag-theme-alpine employee-List-grid" >
            <AgGridReact rowData={rowData} columnDefs={getColumnsDefList(columnsList, true, false)}
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
                sortable={true}
                defaultToolPanel='columns'
                pagination={true}
                paginationPageSize={8} />
        </div>
    )
}

export default Grid;
