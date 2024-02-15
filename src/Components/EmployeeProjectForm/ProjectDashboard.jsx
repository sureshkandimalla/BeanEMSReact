import React, { useState, useEffect } from "react";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeProjectForm.scss';
import './EmployeeProjectDetails.scss';

//const style: React.CSSProperties = { background: '#A9A9A9', padding: '8px 0' ,paddingLeft: '8px 0'};

const ProjectDashboard = () => {

        const [data, setData] = useState([]);

        useEffect(() => {
                fetch('http://localhost:8080/api/v1/projectDashboard')
                    .then(response => response.json())
                    .then(data => setData(data))
                    .catch(error => console.error('Error fetching data:', error));
            }, []);

     return (
            <div  style={{ background: '#f0f0f0', padding: '0px' }}>
               <div className="card">
                       <div className="card-content">
                        <span style={{ color: 'blue', fontSize: '20px'}}>{data.activeProjects} </span>
                        <span style={{ fontSize: '15px' }}> Active projects </span>
                       </div>
                    </div>
                    <div className="card">
                            <div className="card-content">
                             <span style={{ color: 'green', fontSize: '20px'}}>${data.totalRevenue}  </span>
                             <span style={{ fontSize: '15px' }}> Total Revenue </span>
                            </div>
                     </div>

                    <div className="card">
                            <div className="card-content">
                            <span style={{ color: 'red', fontSize: '20px'}}>${data.totalCost}  </span>
                             <span style={{ fontSize: '15px' }}> Total Cost </span>
                            </div>
                     </div>
                    <div className="card">
                            <div className="card-content">
                            <span style={{ color: 'blue', fontSize: '20px'}}>${data.totalRevenue - data.totalCost}  </span>
                             <span style={{ fontSize: '15px' }}>Bean Net</span>
                            </div>
                     </div>
          </div>
        );

      };



export default ProjectDashboard;

