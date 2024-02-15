import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './BillsForm.scss';
import Sidebar from "../../Commons/Sidebar/Sidebar";
import DatePicker from 'react-datepicker';

const BillsForm = () => {
   
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [rowData, setRowData] = useState([]);

    const handleDateChange = date => {
        setSelectedDate(date);
        //alert(date.toISOString().split('T')[0]);
        const formttedDate = date.toISOString().split('T')[0]; //yyyy-mm-dd
        fetchData(formttedDate);
      };

      const fetchData = async date => {
        try {
        const response = await fetch(`http://localhost:8080/api/v1/bills/getBillsForMonthAndYear?selectedDate=${date}`);
        const data = await response.json();
        setRowData(getFlattenedData(data)); // Assuming data is an array of objects with properties like invoice, id, hours
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    const getFlattenedData = (data) => {

        let updatedData = data.map((dataObj) => {
        return { ...dataObj}
        });
        console.log(updatedData)
        return updatedData || [];
    }

    const getColumnsDefList = ( isSortable, isEditable, hasFilter) => {
   /// const columnsList = ['Project Name', 'Project Id ','Employee Id', 'Employee Name', 'Client', 'Vendor','Bill Rate', 'Invoice Terms','startDate','endDate','Status','Employee Pay','Expenses','Bean Expenses','Bean Net','Total Hours';
       var columns = [
                       { headerName: 'Bill Id', field: 'billId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Invoice Id', field: 'invoiceId',sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Assignment Id', field: 'assignmentId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Invoice Month', field: 'invoiceMonth', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Billing', field: 'billing', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Employee Id', field: 'employeeId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Hours', field: 'hours', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Bill Date', field: 'billDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Start Date', field: 'startDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'End Date', field: 'endDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Payment Date', field: 'paymentDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Status', field: 'status', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Bill PaidAmount', field: 'billPaidAmount', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Total', field: 'total', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' }
                       
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
        <div class="container" style={{ marginTop: "0px" }}>
            <label style={{ marginTop: "5px" }}> Select Date: &nbsp;</label>
            <DatePicker class ="left-panel" selected={selectedDate} onChange={handleDateChange} dateFormat="MM/yyyy" placeholderText="Select"  showMonthYearPicker/>
        </div>
   
   
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

export default BillsForm;
