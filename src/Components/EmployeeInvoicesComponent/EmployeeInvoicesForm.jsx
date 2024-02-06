import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeInvoicesForm.scss';
import Sidebar from "../../Commons/Sidebar/Sidebar";
import {useHistory} from "react-router-dom";

const EmployeeInvoicesForm = () => {

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
            const response = await fetch(`http://localhost:8080/api/v1/invoicesForMonthAndYear?selectedDate=${date}`);
            const data = await response.json();
            setRowData(getFlattenedData(data)); // Assuming data is an array of objects with properties like invoice, id, hours
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };
        

    const getFlattenedData = (data) => {

        let updatedData = data.map((dataObj) => {
        return { ...dataObj}

           // return { ...dataObj,...dataObj.assignments[0],...dataObj.employee.firstName.value, ...dataObj.employee.employeeAssignments[0],...dataObj.customer,...dataObj.billRates[0] }
        });
        console.log(updatedData)
        return updatedData || [];
    }

    const getColumnsDefList = () => {
   /// const columnsList = ['Project Name', 'Project Id ','Employee Id', 'Employee Name', 'Client', 'Vendor','Bill Rate', 'Invoice Terms','startDate','endDate','Status','Employee Pay','Expenses','Bean Expenses','Bean Net','Total Hours';
       var columns = [
                        { headerName: 'Project Id', field: 'projectId', sortable: true, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Invoice Id', field: 'invoiceId', sortable: true, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'InvoiceDate', field: 'invoiceDate', sortable: true, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Hours', field: 'hours', sortable: true, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Total', field: 'total', sortable: true, editable: false, filter: 'agTextColumnFilter' },
                        { headerName: 'Start Date', field: 'startDate', sortable: true, editable: true, filter: 'agTextColumnFilter'},
                        { headerName: 'End Date', field: 'endDate', sortable: true, editable: true, filter: 'agTextColumnFilter'},
                        { headerName: 'Status', field: 'status',sortable: true, editable: true, filter: 'agTextColumnFilter'},
                        //{ headerName: 'Actions', cellRenderer: (params) => (
                            //const rowData = params.data;
                          //<button onClick={() => handleSave(params.data)}>Save</button>
                          //{isPopupOpen && <Popup onClose={handleClosePopup} onSubmit={handleFormSubmit} />}
                      // return null;
                      //  ),
                        //width: 100,
                     // },
                    ]
        return columns;
    }

            const handleSave = (rowData) => {
                // Logic to handle adding a new row
                console.log('Adding row:', rowData);
                alert(rowData.employeeId);
               
              };
              const gridOptions = {
                pagination: true,
                paginationPageSize: 8, // Number of rows to show per page
                //enableSorting: true, // Enable sorting
                //enableFilter: true,  // Enable filtering
                domLayout: 'autoHeight',
              };

              const history = useHistory();
              const addNewInvoices = () => {
                history.push('/addInvoices',{selectedDate})
            }


    return (
     <Sidebar>
         <div class="container">
         <label>Select Date: </label>
         <DatePicker class ="left-panel" selected={selectedDate} onChange={handleDateChange} dateFormat="MM/yyyy" placeholderText="Select"  showMonthYearPicker/>
         {/*<span className="calendar-icon" >&#128197;</span>*/}
         <button type="primary"  className='button ' onClick={addNewInvoices}>Add New Invoice</button>
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

export default EmployeeInvoicesForm;