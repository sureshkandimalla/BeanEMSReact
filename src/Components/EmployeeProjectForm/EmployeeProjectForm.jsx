import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeProjectForm.scss';


const EmployeeProjectForm = () => {

     const [rowData, setRowData] = useState();
     const columnsList = ['Project Id', 'Project Name', 'Vendor', 'Client',
         'Start Date', 'End Date', 'Invoice Term', 'Payment Term', 'Status', 'Assignment', 'Last Updated'];
     useEffect(() => {
         fetch('http://localhost:8080/api/v1/projects')
             .then(response => response.json())
             .then(data => {
                 setRowData(getFlattenedData(data));
             })
             .catch(error => console.error('Error fetching data:', error));
     }, []);

     const getFlattenedData = (data) => {
        console.log(data)
         let updatedData = data.map((dataObj) => {
            console.log(dataObj)
             return { ...dataObj, ...dataObj.assignments[0]}
         });
         console.log(updatedData)
         return updatedData || [];
     }

     const getColumnsDefList = (columnsList, isSortable, isEditable) => {
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

 export default EmployeeProjectForm;