import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    RightCircleOutlined,
    FileImageFilled
} from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';
import { useHistory } from 'react-router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeComponent from '../../Components/HomeComponent/HomeComponent';
import EmployeeAssignmentForm from '../../Components/EmployeeAssignmentForm/EmployeeAssignmentForm';
import EmployeeInvoicesForm from '../../Components/EmployeeInvoicesForm/EmployeeInvoicesForm';
import EmployeeProjectForm from '../../Components/EmployeeProjectForm/EmployeeProjectForm';
import EmployeeDetailsComponent from '../../Components/EmployeeDetailsComponent/EmployeeDetailsComponent';
import './Sidebar.scss'
// import './HomeComponent.scss'

const Sidebar = ({ children }) => {
    const { Header, Sider, Content } = Layout;
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const [navKey, setNavKey] = useState('/employee');

    const handleTabClick = (key) => {
        setNavKey(key)
        console.log("page--", key)
        history.push(key)
    }

    

    const handleNxtPageNavigation = async (activeKey) => {
        console.log("activeKey--", activeKey)
        switch (activeKey) {
            case 1:
                console.log("page - 1")
                // history.push('/employee')
                return <HomeComponent />
            case 3:
                console.log("page - 3")
                window.loca.push('/project')
                return <EmployeeProjectForm />
            case 4:
                console.log("page - 4")
                history.push('/assignment')
                return <EmployeeAssignmentForm />
            case 5:
                console.log("page - 5")
                history.push('/invoices')
                return <EmployeeInvoicesForm />
            case 2:
                console.log("page - 2")
                history.push('/employeeDetails')
                return <EmployeeDetailsComponent />

            default:
                history.push('/employee');
                return <HomeComponent />
        }
    }

    return (
        // <Router>
            <Layout className='siderbar-layout' >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                collapsedWidth={'40px'} width={'150px'}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={'/employee'}
                        onClick={(e) => setNavKey(e.key)}
                        selectedKeys={window.location.pathname}
                        // onCollapse={(value) => console.log('value', value)}
                        items={[
                            {
                                key: '/employee',
                                icon: <UserOutlined />,
                                label: 'Employee',
                                title: 'Employee',
                                // label: <Link to='/employee'>Employee</Link>
                                onClick: () => history.push('/employee')
                            },
                            {
                                key: '/employeeDetails',
                                icon: <UserOutlined />,
                                label: 'EmployeeDetails',
                                title: 'EmployeeDetails',
                                // label: <Link to='/employee'>Employee</Link>
                                onClick: () => history.push('/employeeDetails')
                            },
                            {
                                key: '/project',
                                icon: <VideoCameraOutlined />,
                                label: 'Project',
                                title: 'Project',
                                onClick: () => history.push('/project')
                                // onClick: () => setNavKey(2),
                                // label: <Link to='/project'>Project</Link>
                            },
                            {
                                key: '/assignment',
                                icon: <UploadOutlined />,
                                label: 'Assignment',
                                title: 'Assignment',
                                // label: <Link to='/assignment'>Assignment</Link>,
                                // onClick: () => setNavKey(3),
                                // render: () => <></>
                                // onClick: () => handleTabClick('/assignment')
                                onClick: () => history.push('/assignment')
                            },
                            {
                                key: '/invoices',
                                icon: <FileImageFilled />,
                                label: 'Invoices',
                                title: 'Invoices',
                                onClick: () => history.push('/invoices') //todo
                                // onClick: () => setNavKey(2),
                                // label: <Link to='/project'>Project</Link>
                            }
                        ]}
                    />
                </Sider>
                <Layout>
                    <Content
                        style={{
                            // margin: '24px 16px',
                            // padding: 24,
                            minHeight:'91vh',
                            background: '#fff',
                            // width:'150px'
                        }}
                    >
                        {/* {children} */}
                        {/* {handleNxtPageNavigation() || } */}
                        {children}
                    </Content>
                </Layout>
            </Layout>
        // </Router>
    )
}

export default Sidebar;