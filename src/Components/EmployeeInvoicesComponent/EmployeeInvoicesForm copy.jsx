import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeInvoicesForm.scss';
import Sidebar from "../../Commons/Sidebar/Sidebar";

const EmployeeInvoicesForm = () => {

    const [rowData, setRowData] = useState();


    useEffect(() => {
        fetch('http://localhost:8080/api/v1/getProjects') //TODO change api as need
            .then(response => response.json())
            .then(data => {
                setRowData(getFlattenedData(data));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getFlattenedData = (data) => {

        let updatedData = data.map((dataObj) => {
        return { ...dataObj}

           // return { ...dataObj,...dataObj.assignments[0],...dataObj.employee.firstName.value, ...dataObj.employee.employeeAssignments[0],...dataObj.customer,...dataObj.billRates[0] }
        });
        console.log(updatedData)
        return updatedData || [];
    }

    const getColumnsDefList = ( isSortable, isEditable, hasFilter) => {
   /// const columnsList = ['Project Name', 'Project Id ','Employee Id', 'Employee Name', 'Client', 'Vendor','Bill Rate', 'Invoice Terms','startDate','endDate','Status','Employee Pay','Expenses','Bean Expenses','Bean Net','Total Hours';
       var columns = [
                        
                        { headerName: 'Project Id', field: 'projectId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Project Name', field: 'projectName', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Employee Id', field: 'employeeId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Employee Name', field: 'employeeName', sortable: isSortable, editable: false, filter: 'agTextColumnFilter' },
                        { headerName: 'Month', field: 'month', filter: 'agSetColumnFilter', filterParams: { values: generateMonthOptions() } },
                        { headerName: 'Year', field: 'year', filter: 'agSetColumnFilter', filterParams: { values: get20Years() }},
                        { headerName: 'Vendor', field: 'vendorName', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Bill Rate', field: 'billRate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Project Start Date', field: 'startDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Project End Date', field: 'endDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        //{ headerName: 'Bean Net', field: 'customerCompanyName', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                       // { headerName: 'Total Hours', field: 'projectId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' }
                       { headerName: 'Actions', cellRenderer: (params) => (
                            //const rowData = params.data;
                          <button onClick={() => handleAddButtonClick(params.data)}>Add Invoice</button>
                          //{isPopupOpen && <Popup onClose={handleClosePopup} onSubmit={handleFormSubmit} />}
                      // return null;
                        ),
                        width: 100,
                      },
                    ]
        return columns;
    }

            const get20Years = () => {
                const currentYear = 2020;//new Date().getFullYear();
                const years = [];

                for (let i = 0; i < 20; i++) {
                const year = currentYear + i;
                years.push(year.toString());
                }

                return years;
            };

            const handleAddButtonClick = (rowData) => {
                // Logic to handle adding a new row
                console.log('Adding row:', rowData);
                alert(rowData.employeeId);
                setIsPopupOpen(true);
                {isPopupOpen && <Popup onClose={handleClosePopup} onSubmit={handleFormSubmit} />}
              };
            
            // Helper function to generate an array of month names
            const generateMonthOptions = () => {
                return Array.from({ length: 12 }, (_, index) => {
                const month = new Date(0, index).toLocaleDateString('en-US', { month: 'long' });
                return month;
                });
            };
            
        const [isPopupOpen, setIsPopupOpen] = useState();
        const handleNumericInputChange = (fieldName, value) => {

            // Validate for string input
            {/*if (/^[a-zA-Z]+$/.test(value) || value === '') {
                setValidationErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
                //if (fieldName === 'projectName') setProjectName(value);
                //if (fieldName === 'client') setClient(value);
                setFormData({
                ...formData,
                [fieldName]: value,
                });
            } else {
                setValidationErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: 'Please enter only letters.',
                }));
            }
            
        */}

            setRowData({
                ...rowData,
                [fieldName]: value,
                });
            };

        const Popup = ({ onClose, onSubmit }) => {
 
                return (
              <div className="popup-container">
              <div className="popup">
                <h2>Enter Project/client Details</h2>
    
                {/* Input Fields */}
            <div className="input-container">
              <div>
                <label>ProjectId:</label>
                <input type="text" value={rowData.projectId} onChange={(e) => handleNumericInputChange('projectId', e.target.value)} />
              </div>
              <div>
                <label>EmployeeId:</label>
                <input type="text" value={rowData.employeeId} onChange={(e) => handleNumericInputChange('employeeId', e.target.value)} />
              </div>
              <div>
                <label>VendorId:</label>
                <input type="text" value={rowData.vendorId} onChange={(e) => handleNumericInputChange('vendorId', e.target.value)} />
              </div>
              <div>
                <label>Client:</label>
                <input type="text" value={rowData.client} onChange={(e) => handleNumericInputChange('client', e.target.value)} />
              </div>
                  {/* Add more fields as needed */}
                </div>
    
                {/* Cancel and Submit Buttons */}
                <div className="button-container">
                  <button onClick={handleClosePopup}>Cancel</button>
                  <button onClick={handleClear}>Clear</button>
                  <button onClick={handleFormSubmit}>Submit</button>
                </div>
              </div>
            </div>
                );
              };
    
        // Handle clear button click
        const handleClear = () => {
            // Clear all form data
            setRowData({
            projectId: '', vendorId: '', employeeId: '', client: '', });
            
        };

        const handleOpenPopup = () => {
            setIsPopupOpen(true);
        };

        const handleClosePopup = () => {
            handleClear();
            setIsPopupOpen(false);
        };

        // Handle submit button click
        const handleFormSubmit = () => {
            // Validate all fields before submitting
           const isValid =true; //TODO validation
            alert(rowData.status);
            if (isValid) {
            // Call your backend API with the data
            console.log('Submitting data to the backend:', rowData);

                //  make an API call to insert new project details into db
                // Example using fetch:
                fetch('', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(rowData),
                })
                    .then(response => response.json())
                    .then(data => {
                    console.log('API Response:', data);
                //     // Handle the API response as needed
                    }).catch(error => console.error('Error fetching data:', error));;
            } else {
            console.log('Form has validation errors. Please correct them.');
            }
            handleClosePopup();
        };

    return (
     <Sidebar>
        <div className="ag-theme-alpine employee-List-grid" >
            <AgGridReact rowData={rowData} columnDefs={getColumnsDefList( true, false)}
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
         </Sidebar>
    )
}

export default EmployeeInvoicesForm;