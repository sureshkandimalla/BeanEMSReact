import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './VendorForm.scss';
import Sidebar from "../../Commons/Sidebar/Sidebar";
import { useHistory } from 'react-router-dom';

const VendorForm = () => {
   
  const [rowData, setRowData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  useEffect(() => {
      fetch('http://localhost:8080/api/v1/customers/getAllCustomers') //from customer table
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
                      { headerName: 'Customer Id', field: 'customerId', sortable: isSortable, editable: true },
                      { headerName: 'Name', field: 'customerCompanyName',sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      { headerName: 'Email', field: 'customerEmail', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                     //{ headerName: 'Assignment Type', field: 'customerName', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      { headerName: 'Phone', field: 'customerPhone', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      { headerName: 'Status', field: 'customerStatus', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      { headerName: 'ein', field: 'ein', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      { headerName: 'Website', field: 'website', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      { headerName: 'Start Date', field: 'customerStartDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      { headerName: 'End Date', field: 'customerEndDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      
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

   const addNewVendor = (e) => {
        history.push('/vendorOnBoarding')
    }

  return (
      <Sidebar>
      {/*<div class="container" style={{ marginTop: "0px" }}>
          <label style={{ marginTop: "5px" }}> Select Date: &nbsp;</label>
          <DatePicker class ="left-panel" selected={selectedDate} onChange={handleDateChange} dateFormat="MM/yyyy" placeholderText="Select"  showMonthYearPicker/>
      </div>*/}
 
 
      <div className="ag-theme-alpine employee-List-grid" >
        <div class="container">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchInputChange}
          />
          <button type="primary" className='button ' onClick={filterData}>Search</button>
          <button type="primary"  className='button-vendor ' onClick={addNewVendor} >Add New vendor</button>
        </div>
         { rowData && rowData.length > 0 ? (
           <AgGridReact  rowData={filterData()} columnDefs={getColumnsDefList()} gridOptions={gridOptions}
           defaultColDef={{
             flex: 1,
             minWidth: 150,
             resizable: true,
             filter: false,
             floatingFilter: false
         }}
                  />
         ) : (
             <p>No Records Found...</p>
           )}
         </div>
          </Sidebar>
     )
}

export default VendorForm;
