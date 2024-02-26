import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeProjectForm.scss';
import Sidebar from "../../Commons/Sidebar/Sidebar";
import ProjectDashboard from '../EmployeeProjectForm/ProjectDashboard';
import { useHistory } from 'react-router-dom';

const Grid = () => {

    const [rowData, setRowData] = useState();
      const [searchText, setSearchText] = useState('');
      const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/getProjects')
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

    const getColumnsDefList = ( isSortable, isEditable, hasFilter) => {
   /// const columnsList = ['Project Name', 'Project Id ','Employee Id', 'Employee Name', 'Client', 'Vendor','Bill Rate', 'Invoice Terms','startDate','endDate','Status','Employee Pay','Expenses','Bean Expenses','Bean Net','Total Hours';
       var columns = [
                       { headerName: 'Project Name', field: 'projectName', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                       { headerName: 'Project Id', field: 'projectId', cellRenderer: (params) => {const rowData = params.data;
                              return ( <Link to={{ pathname: '/projectDetails',state: { rowData }, }} > {rowData.projectId}</Link>); }, sortable: isSortable, editable: false, filter: 'agTextColumnFilter' },
                      //  { headerName: 'Employee Id', field: 'employeeId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      { headerName: 'Employee Name', field: 'employeeName', cellRenderer: (params) => { const rowData = params.data;
                            return (<Link to={{  pathname: '/employeeProjectDetails', state: { rowData }, }} > {rowData.employeeName} </Link> );}, sortable: isSortable, editable: false, filter: 'agTextColumnFilter' },
                        //{ headerName: 'Employee Name', field: 'employeeName', valueGetter(params) { return  params.data.firstName + ' ' + params.data.lastName ;},sortable: isSortable, editable: false, filter: 'agTextColumnFilter' },
                        { headerName: 'Client', field: 'clientName',sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Vendor', field: 'vendorName', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Bill Rate', field: 'billRate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Project Start Date', field: 'startDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Project End Date', field: 'endDate', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Status', field: 'status', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Invoice Terms', field: 'invoiceTerm', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        { headerName: 'Invoice Terms', field: 'invoiceTerm', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        //{ headerName: 'Employee Pay', field: 'projectName', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        //{ headerName: 'Expenses', field: 'client', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                        //{ headerName: 'Bean Expenses', field: 'customerCompanyName', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                       // { headerName: 'Bean Net', field: 'customerCompanyName', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                       // { headerName: 'Total Hours', field: 'projectId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' }
                       ]
        return columns;
    }

    const addNewProject = (e) => {
      history.push('/projectOnBoarding')
  }

    return (
     <Sidebar>
        <ProjectDashboard rowData={filterData()} />


        <div className="ag-theme-alpine employee-List-grid" >
          <div class="container">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchInputChange}
            />
            <button type="primary" className='button ' onClick={filterData}>Search</button>
            <Link to={{ pathname: '/projectOnBoarding', state: { rowData } }}>
            <button type="primary"  className='button-vendor ' onClick={addNewProject} >Add New Project</button>
            </Link>
          </div>
            <AgGridReact rowData={filterData()} columnDefs={getColumnsDefList( true, false)}
                domLayout="autoHeight"
                defaultColDef={{
                    flex: 1,
                    minWidth: 150,
                    resizable: true,
                    filter: false,
                    floatingFilter: false
                }}
                hiddenByDefault={false}
                rowGroupPanelShow='never'
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
                                suppressRowGroups: false,
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
                paginationPageSize={15} />
        </div>

         </Sidebar>
    )
}

export default Grid;
