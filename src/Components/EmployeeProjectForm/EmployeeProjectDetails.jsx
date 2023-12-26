import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeProjectForm.scss';
import Sidebar from "../../Commons/Sidebar/Sidebar";
import EmployeePersonalDetatils from "../EmployeePersonalDetatils/EmployeePersonalDetatils";
import { Col, Divider, Row ,Card, Button, Space  } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined  } from '@ant-design/icons';


const style: React.CSSProperties = { background: '#A9A9A9', padding: '8px 0' ,paddingLeft: '8px 0'};

const TwoPartPage = () => {
const divStyle = {
//     height: '95%', // Set the desired height in pixels or any other valid CSS unit
    border: '1px solid #ccc',
    padding: '20px',
     background: '#ffffff',
     border: '0px solid #ccc',
      padding: '20px'
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

     return (
         <Sidebar>
            <div className="part" style={{ background: '#f0f0f0', padding: '20px' }}>
          <Row gutter={16} style={{minHeight: '100%'}}>
                {/* First Part */}
                <Col span={6}  >
                  <div className="part" style={divStyle}>
                    <Card className="responsive-card"
                         style={{ width: '100%' }}>
                         <p>
                         <div>
                             <span className='name-span' style={{  wordWrap: 'break-word', color: 'blue',position: 'responsive',    padding: '5px' ,fontSize: '20px'}}>
                                 <UserOutlined style={{  wordWrap: 'break-word',position: 'responsive',marginRight: '14px' }} />Suresh R Kandimalla</span>
                                 <button style={{ float: 'right' ,position: 'responsive', top: '4', right: '0', background: '#ffffff',border: 'none',cursor: 'pointer' }}  onClick={handleClick}>...</button><br />
                                 <span className="designation-style">Software Developer</span>
                                 <span style={{ float: 'right', position: 'responsive',  right: '0', color: 'black', padding: '5px' ,fontSize: '10px'}}> W2</span>
                         </div>
                            <div>
                                <span style={{  wordWrap: 'break-word', position: 'responsive',   color: 'black', padding: '5px' ,fontSize: '12px'}}>  <MailOutlined /> example@example.com</span>
                                <span style={{  wordWrap: 'break-word', position: 'responsive',   color: 'black', padding: '5px' ,fontSize: '12px'}}> <PhoneOutlined /> +1 123-456-7890 </span>
                            </div>
                         </p>
                     </Card>

                    </div>
                </Col>

                {/* Second Part */}
                <Col span={18} >
                  <div className="part"  style={divStyle}>
                    <h2>Part 2</h2>
                    <p>This is the content of the second part of the page.</p>
                  </div>
                </Col>
              </Row>
</div>


          </Sidebar>
        );

      };




export default TwoPartPage;

