import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeAssignmentForm.scss';
import Sidebar from "../../Commons/Sidebar/Sidebar";
import DatePicker from 'react-datepicker';

const EmployeeAssignmentForm = () => {
   
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/getActiveAssignments')
            .then(response => response.json())
            .then(data => {
                setRowData(getFlattenedData(data));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getFlattenedData = (data) => {

        let updatedData = data.map((dataObj) => {
        return { ...dataObj}
        });
        console.log(updatedData)
        return updatedData || [];
    }

    const getColumnsDefList = ( isSortable, isEditable, hasFilter) => {
       var columns = [
                        { headerName: 'Employee Id', field: 'employeeId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Project Id', field: 'projectId',sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Assignment Id', field: 'assignmentId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Assignment Type', field: 'assignmentType', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Wage', field: 'wage', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        
                        { headerName: 'Start Date', field: 'startDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'End Date', field: 'endDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Status', field: 'status', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'LastUpdated', field: 'lastUpdated', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        
                    ]
        return columns;
    }

    const gridOptions = {
        pagination: true,
        paginationPageSize: 8, // Number of rows to show per page
        //enableSorting: true, // Enable sorting
        //enableFilter: true,  // Enable filtering
        domLayout: 'autoHeight',
      };


    return (
        <Sidebar>
        {/*<div class="container" style={{ marginTop: "0px" }}>
            <label style={{ marginTop: "5px" }}> Select Date: &nbsp;</label>
            <DatePicker class ="left-panel" selected={selectedDate} onChange={handleDateChange} dateFormat="MM/yyyy" placeholderText="Select"  showMonthYearPicker/>
        </div>*/}
   
   
           <div className="ag-theme-alpine employee-List-grid" >
           { rowData && rowData.length > 0 ? (
             <AgGridReact rowData={rowData} columnDefs={getColumnsDefList()} gridOptions={gridOptions}
             defaultColDef={{
               flex: 1,
               minWidth: 150,
               resizable: true,
               filter: true,
               floatingFilter: true
           }}
                    />
           ) : (
               <p>No Records Found...</p>
             )}
           </div>
            </Sidebar>
       )
}

export default EmployeeAssignmentForm;