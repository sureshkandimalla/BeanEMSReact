import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField'; 
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeProjectForm.scss';
import './EmployeeProjectDetails.scss';
import Sidebar from "../../Commons/Sidebar/Sidebar";
import { Col, Row ,Card, Tabs  } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined  } from '@ant-design/icons';
import { useLocation, useHistory } from 'react-router-dom';
import bigInt from 'big-integer';
import EmployeeAddProject from '../EmployeeProjectForm/EmployeeAddProject';
import { Link } from 'react-router-dom';



//const style: React.CSSProperties = { background: '#A9A9A9', padding: '8px 0' ,paddingLeft: '8px 0'};

const ProjectDashboard = () => {


     return (
            <div  style={{ background: '#f0f0f0', padding: '0px' }}>
               <div className="card">
                       <div className="card-content">
                        <span style={{ color: 'blue', fontSize: '20px'}}>15  </span>
                        <span style={{ fontSize: '15px' }}> Active projects </span>
                       </div>
                    </div>
                    <div className="card">
                            <div className="card-content">
                             <span style={{ color: 'green', fontSize: '20px'}}>$500  </span>
                             <span style={{ fontSize: '15px' }}> Total Revenue </span>
                            </div>
                     </div>

                    <div className="card">
                            <div className="card-content">
                            <span style={{ color: 'red', fontSize: '20px'}}>220  </span>
                             <span style={{ fontSize: '15px' }}> Total Cost </span>
                            </div>
                     </div>
                    <div className="card">
                            <div className="card-content">
                            <span style={{ color: 'blue', fontSize: '20px'}}>$280  </span>
                             <span style={{ fontSize: '15px' }}>Bean Net</span>
                            </div>
                     </div>
          </div>
        );

      };



export default ProjectDashboard;

