import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeProjectForm.scss';
import Sidebar from "../../Commons/Sidebar/Sidebar";
import EmployeeListGridComponent from '../EmployeeListGridComponent/EmployeeListGridComponent';
import EmployeeProjectDetails from './EmployeeProjectDetails'

const Grid = () => {

    const [rowData, setRowData] = useState();


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

    const getColumnsDefList = ( isSortable, isEditable, hasFilter) => {
   /// const columnsList = ['Project Name', 'Project Id ','Employee Id', 'Employee Name', 'Client', 'Vendor','Bill Rate', 'Invoice Terms','startDate','endDate','Status','Employee Pay','Expenses','Bean Expenses','Bean Net','Total Hours';
       var columns = [
                        { headerName: 'Project Name', field: 'projectName', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                       // { headerName: 'Project Id', field: 'projectId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      //  { headerName: 'Employee Id', field: 'employeeId', sortable: isSortable, editable: true, filter: 'agTextColumnFilter' },
                      { headerName: 'Employee Name', field: 'employeeName', cellRenderer: (params) => {
                                                                                                            //const hrefValue = `https://example.com/${params.data.id}`;
                                                                                                            const hrefValue = `/projectDetails`;
                                                                                                            return <a href={hrefValue} target="_self" >{params.value}</a>;
                                                                                                          },
                             sortable: isSortable, editable: false, filter: 'agTextColumnFilter' },
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

export default Grid;
