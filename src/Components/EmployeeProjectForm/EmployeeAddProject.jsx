import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField'; 
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeProjectForm.scss';
import './EmployeeProjectDetails.scss';
import Sidebar from "../../Commons/Sidebar/Sidebar";
import { useLocation, useHistory } from 'react-router-dom'

const EmpPopupForm = () => {

    //Below from EmployeeProjectForm
    const location = useLocation();
    const { rowData } = location.state;

        const [isPopupOpen, setIsPopupOpen] = useState();
                
        // State variables for input values
        const [formData, setFormData] = useState({
        projectId: '', vendorId: '', employeeId: '', client: '', status: '', projectName: '', startDate: '', endDate: '', invoiceTerm: '', paymentTerm: '',
        });

        // State variable for validation errors
        const [validationErrors, setValidationErrors] = useState({
        projectId: '', vendorId: '', employeeId: '', client: '', projectName: '', status: '',
        });

        const handleNumericInputChange = (fieldName, value) => {
        // Validate for numeric input
        console.log(value);
        if (/^\d+$/.test(value) || value === '') {
            setValidationErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
            
            setFormData({
            ...formData,
            [fieldName]: value,
            });
        } else {
            setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: 'Please enter a valid number.',
            }));
        }
        };

        const handleStringInputChange = (fieldName, value) => {
        // Validate for string input
        if (/^[a-zA-Z]+$/.test(value) || value === '') {
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
        };

        // Handle input change for date field
        const handleDateInputChange = (fieldName, value) => {
        // You may implement date validation logic here
        //setDate(value);
        setFormData({
            ...formData,
            [fieldName]: value,
        });
        };
        const handleChange = (fieldName, value) => {
        //const { name, value } = e.target;    
        // Update form data
        setFormData({ ...formData, [fieldName]: value });
        };

        // Handle clear button click
        const handleClear = () => {
        // Clear all form data
        setFormData({
            projectId: '', vendorId: '', employeeId: '', client: '', status: '', projectName: '', startDate: '', endDate: '', invoiceTerm: '', paymentTerm: '',
        });

        setValidationErrors({
            projectId: '', vendorId: '', employeeId: '', client: '', projectName: '', status: '',
        });
        
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
        if (!formData.projectId.trim() ) {
            setValidationErrors((prevErrors) => ({...prevErrors, projectId: 'Please enter a valid number.',}));
            return;
        }
        if (!formData.employeeId.trim() ) {
            setValidationErrors((prevErrors) => ({...prevErrors, employeeId: 'Please enter a valid number.',}));
            return;
        }
        if (!formData.vendorId.trim() ) {
            setValidationErrors((prevErrors) => ({...prevErrors, vendorId: 'Please enter a valid number.',}));
            return;
        }
        if (!formData.client.trim() ) {
            setValidationErrors((prevErrors) => ({...prevErrors, client: 'Please enter a valid client.',}));
            return;
        }
        if (!formData.projectName.trim() ) {
            setValidationErrors((prevErrors) => ({...prevErrors, client: 'Please enter a valid projectName.',}));
            return;
        }
        if (!formData.startDate.trim() || !formData.endDate.trim()) {
            setValidationErrors((prevErrors) => ({...prevErrors, client: 'Please enter a valid date.',}));
            return;
        }

        const isValid = Object.values(validationErrors).every((error) => !error);
        alert(isValid);
        alert(formData.status);
        if (isValid) {
            // Call your backend API with the data
            console.log('Submitting data to the backend:', formData);

                //  make an API call to insert new project details into db
                // Example using fetch:
                fetch('http://localhost:8080/api/v1/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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

        const Popup = ({ onClose, onSubmit }) => {
        
            return (
        <div className="popup-container">
        <div className="popup">
            <h2>Enter Project/client Details</h2>

            {/* Input Fields */}
        <div className="input-container">
        <div>
            <label>ProjectId:</label>
            <input type="text" value={formData.projectId} onChange={(e) => handleNumericInputChange('projectId', e.target.value)} />
            <span style={{ color: 'red' }}>{validationErrors.projectId}</span>
        </div>
        <div>
            <label>EmployeeId:</label>
            {/* <input type="text" value={formData.employeeId} onChange={(e) => handleNumericInputChange('employeeId', e.target.value)} /> */}
            <input type="text" value={rowData.employeeId} disabled = {true} />
            <span style={{ color: 'red' }}>{validationErrors.employeeId}</span>
        </div>
        <div>
            <label>VendorId:</label>
            <input type="text" value={formData.vendorId} onChange={(e) => handleNumericInputChange('vendorId', e.target.value)} />
            <span style={{ color: 'red' }}>{validationErrors.vendorId}</span>
        </div>
        <div>
            <label>Client:</label>
            <input type="text" value={formData.client} onChange={(e) => handleStringInputChange('client', e.target.value)} />
            <span style={{ color: 'red' }}>{validationErrors.client}</span>
        </div>
        <div>
            <label>ProjectName:</label>
            <input type="text" value={formData.projectName} onChange={(e) => handleStringInputChange('projectName', e.target.value)} />
            <span style={{ color: 'red' }}>{validationErrors.projectName}</span>
        </div>
        <div>
            <label>StartDate:</label>
            <input type="text" id="date" label="" type="date" InputLabelProps={{shrink: true, }} value={formData.startDate} onChange={(e) => handleDateInputChange('startDate', e.target.value)} />
            <span style={{ color: 'red' }}>{validationErrors.startDate}</span>
        </div>
        <div>
            <label>EndDate:</label>
            <input type="text" id="date" label="" type="date" InputLabelProps={{shrink: true, }} value={formData.endDate} onChange={(e) => handleDateInputChange('endDate', e.target.value)} />
            <span style={{ color: 'red' }}>{validationErrors.endDate}</span>
        </div>
        <div>
            <label>InvoiceTerm:</label>
            <input type="text" defaultValue={formData.invoiceTerm} onChange={(e) => handleChange('invoiceTerm', e.target.value)}  />
        </div>
        <div>
            <label>PaymentTerm:</label>
            <input type="text" value={formData.paymentTerm} onChange={(e) => handleChange('paymentTerm', e.target.value)}  />
        </div>
        <div>
            <label>Status:</label>
            <input type="text" value={formData.status} onChange={(e) => handleStringInputChange('status', e.target.value)} />
            <span style={{ color: 'red' }}>{validationErrors.status}</span>
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


            return (
                <div id='Popupbutton'>
                <button onClick={handleOpenPopup}>Add New Project</button>
                {isPopupOpen && <Popup onClose={handleClosePopup} onSubmit={handleFormSubmit} />}
                </div>
            );
}

export default EmpPopupForm;