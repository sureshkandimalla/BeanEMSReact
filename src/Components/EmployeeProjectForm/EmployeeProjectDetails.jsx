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


//const style: React.CSSProperties = { background: '#A9A9A9', padding: '8px 0' ,paddingLeft: '8px 0'};

const TwoPartPage = () => {
    const divStyle = {
    //     height: '95%', // Set the desired height in pixels or any other valid CSS unit
        border: '1px solid #ccc',
        padding: '20px',
        background: '#ffffff',
        //border: '0px solid #ccc',
      };
    const handleClick = () => {
        // Your logic or actions when the button is clicked
        console.log('Button clicked!');
      };

     const buttonStyle = {
        border: 'none', // Remove the border
        padding: '10px', // Add padding for better appearance
        background: 'ffffff', // Add a background color (optional)
        cursor: 'pointer', // Change cursor on hover
      };
        const secondLineStyle = {
          fontSize: '10px',      // Set a different font size for the second line
          fontWeight: 'bold',    // Apply additional styles as needed
        };
        const spanWithTextWrap = {
            display: 'block', // Ensure the span behaves like a block element
            whiteSpace: 'normal', // Allow text to wrap
            wordWrap: 'break-word', // Enable word wrap
          };
 
          const location = useLocation();
          const { rowData } = location.state;
          const [responseData, setResponseData] = useState(null);
          const [isLoading, setIsLoading] = useState(true);
          const [error, setError] = useState();
          
          const apiUrl = 'http://localhost:8080';
          const endpoint = '/api/v1/employees';
          const empId = bigInt(rowData.employeeId);
          // Construct the URL with the path variable
          const url = `${apiUrl}${endpoint}/${empId}`;
         
          useEffect(() => {
            alert(url);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                  alert(data.firstName);
                  setResponseData(data);
                  
                })
                .catch(error => console.error('Error fetching data:', error));
        }, []);

          const { TabPane } = Tabs;
          const history = useHistory();
          const items = [
            {
                key: 1,
                label: 'Projects',
                children: < EmployeeAddProject />
            },
            {
                key: 2,
                label: 'Invoices'
            },
            {
              key: 3,
              label: 'LeaveReport'
          },
        ]
        
        const toggleTabs = (e) => {
          //TODO
        }
        const modifyTableColumns = (e) => {
            history.push('/onboarding')
        }
     return (
         <Sidebar>
            <div className="part" style={{ background: '#f0f0f0', padding: '20px' }}>
          <Row gutter={16} style={{minHeight: '100%'}}>
                {/* First Part */}
                <Col span={6}  >
                  <div className="part" style={divStyle}>
                  {responseData && (
                  <>
                    <Card className="responsive-card"
                         style={{ width: '100%' }}>
                         <p>
                         <div>
                             <span className='name-span' style={{  wordWrap: 'break-word', color: 'blue',position: 'responsive',    padding: '5px' ,fontSize: '20px'}}>
                                 <UserOutlined style={{  wordWrap: 'break-word',position: 'responsive',marginRight: '14px' }} /> {responseData.firstName +' '+responseData.lastName}</span>
                                 <button style={{ float: 'right' ,position: 'responsive', top: '4', right: '0', background: '#ffffff',border: 'none',cursor: 'pointer' }}  onClick={handleClick}>...</button><br />
                                 <span className="designation-style">{responseData.designation}</span>
                                 <span style={{ float: 'right', position: 'responsive',  right: '0', color: 'black', padding: '5px' ,fontSize: '10px'}}> {responseData.employmentType}</span>
                         </div>
                            <div>
                                <span style={{  wordWrap: 'break-word', position: 'responsive',   color: 'black', padding: '5px' ,fontSize: '12px'}}>  <MailOutlined /> {responseData.emailId}</span>
                                <span style={{  wordWrap: 'break-word', position: 'responsive',   color: 'black', padding: '5px' ,fontSize: '12px'}}> <PhoneOutlined /> {responseData.phone} </span>
                            </div>
                         </p>
                     </Card>
                     </>
                    )}
                    </div>
                </Col>

                {/* Second Part */}
                <Col span={10} >
                  <div className="part"  style={divStyle}>
                  <Tabs className='bean-home-tabs' defaultActiveKey="1" onChange={toggleTabs} items={items}>
                 </Tabs>
                  </div>
                </Col>
              </Row>
          </div>


          </Sidebar>
        );

      };



export default TwoPartPage;

