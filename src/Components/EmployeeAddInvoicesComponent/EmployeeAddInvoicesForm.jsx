import React, { Component } from 'react';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from "../../Commons/Sidebar/Sidebar";
import { center } from 'react-dom-factories';
import './EmployeeAddInvoicesForm.scss';
import { useLocation, useHistory } from 'react-router-dom';

class EmployeeAddInvoicesForm extends Component {

  constructor(props) {
    super(props);
    
    const CustomDatePicker = ({ value, onChange }) => (
        <DatePicker selected={value} onChange={onChange} />
      );
    this.state = {
      gridOptions: {
        columnDefs: [
          { headerName: 'Employee Id', field: 'employeeId', sortable: true },
          { headerName: 'Employee Name', field: 'employeeName', sortable: true },
          { headerName: 'Client', field: 'clientName', sortable: true },
          { headerName: 'Vendor', field: 'vendorName', sortable: true, editable: false },
          { headerName: 'Bill Rate', field: 'billRate', sortable: true, editable: false },
          { headerName: 'Hours', field: 'hours', sortable: true, editable: true, cellStyle: { color: 'blue',  backgroundColor: '', border: '1px  solid #0a0a0a' }, cellRendererFramework: (params) => (
            <input
              type="text"
              value={params.data.hours}
              onChange={(e) => this.handleInputChange(e, 'hours', params)}
            />
          )},
          { headerName: 'Invoice ID', field: 'invoiceId', sortable: true, editable: true, cellStyle: { color: 'red',  backgroundColor: '', border: '1px  solid #0a0a0a' }, cellRendererFramework: (params) => (
            <input
              type="text"
              value={params.data.invoiceId}
              onChange={(e) => this.handleInputChange(e, 'invoiceId', params)}
            />
          )},
          { headerName: 'Total', field: 'total', sortable: true, editable: true, cellStyle: { color: 'blue', backgroundColor: '', border: '1px  solid #0a0a0a'}, cellRendererFramework: (params) => (
            <input
              type="text"
              value={params.data.total}
              onChange={(e) => this.handleInputChange(e, 'total', params)}
            />
          )},
          
        ],
        rowData: [], // Data will be fetched from the API
        onCellEditingStopped: this.onCellEditingStopped,
        onCellClicked: this.onCellClicked,
      },
    };
  }

  onCellClicked = (event) => {
    // Add class with blinking effect on click
    const cellElement = event.event.target;
    cellElement.classList.add('blinking');
    setTimeout(() => cellElement.classList.remove('blinking'), 1000); // Remove class after 1 second
  };

  componentDidMount() {
    // Fetch data from your API endpoint and update the rowData
    // Example: Fetch data using fetch or axios
    const apiUrl = 'http://localhost:8080';
    const endpoint = '/api/v1/activeProjects';
    const endDate =  new Date().toISOString().split('T')[0];
    // Construct the URL with the path variable
    const url = `${apiUrl}${endpoint}/${endDate}`;   //TODO to pass startdate/anyother depends on req
    alert(endDate);
    alert(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Update the rowData state
        this.setState((prevState) => ({
          gridOptions: {
            ...prevState.gridOptions,
            rowData: data,
          },
        }));
      })
      .catch((error) => console.error('API Error:', error));
  }

  onCellEditingStopped = (event) => {
    // Access the edited value from event.data and perform actions if needed
    console.log('Cell Editing Stopped:', event.data);
  };

  handleInputChange = (e, fieldName, params) => {
    // Handle input field change and update the rowData
    params.data[fieldName] = e.target.value;
alert(fieldName);
alert(e.target.value);
    // Update the state to trigger re-render
    this.setState((prevState) => ({
      gridOptions: {
        ...prevState.gridOptions,
        rowData: [...prevState.gridOptions.rowData],
      },
    }));
  };
  
  onSaveButtonClick = () => {
    // Add your API call logic here to save the data
    // Example: Make a POST request to the server with the data

    const dataToSave = this.state.gridOptions.rowData;
    console.log('Data to Save:', dataToSave);
    const { location } = this.props;
    const { state } = location;
    const formatSelectedDate = state.selectedDate.toISOString().split('T')[0];
    alert(formatSelectedDate);
    const updatedDataToSave = dataToSave.map(item => ({
        ...item, // Spread the existing properties
        formatSelectedDate: formatSelectedDate, // Add the new property
      }));
      console.log('updatedDataToSave:', updatedDataToSave);
    //TODO update set state rowdata

    // Simulate an API call 
     fetch('http://localhost:8080/api/v1/addInvoices', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(updatedDataToSave),
     })
       .then(response => response.json())
       .then(data => console.log('API Response:', data))
       .catch(error => console.error('API Error:', error));
  };

  render() {
    return (
        <Sidebar>
      <div className="ag-theme-alpine employee-List-grid"  style={{ height: 400, width: '100%', margin: 'auto'}}>
        <AgGridReact {...this.state.gridOptions} />
        <button style={{ marginTop: '10px' }} align={center} onClick={this.onSaveButtonClick}>Save</button>
      </div>
      </Sidebar>
    );
  }
}

export default EmployeeAddInvoicesForm;
