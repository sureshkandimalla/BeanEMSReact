import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    RightCircleOutlined
} from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';
import { useHistory } from 'react-router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeComponent from '../../Components/HomeComponent/HomeComponent';
import EmployeeAssignmentForm from '../../Components/EmployeeAssignmentForm/EmployeeAssignmentForm';
import EmployeeProjectForm from '../../Components/EmployeeProjectForm/EmployeeProjectForm';
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
            case 2:
                console.log("page - 2")
                window.loca.push('/project')
                return <EmployeeProjectForm />
            case 3:
                console.log("page - 3")
                history.push('/assignment')
                return <EmployeeAssignmentForm />

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
                                // label: <Link to='/employee'>Employee</Link>
                                onClick: () => history.push('/employee')
                            },
                            {
                                key: '/project',
                                icon: <VideoCameraOutlined />,
                                label: 'Project',
                                onClick: () => history.push('/project')
                                // onClick: () => setNavKey(2),
                                // label: <Link to='/project'>Project</Link>
                            },
                            {
                                key: '/assignment',
                                icon: <UploadOutlined />,
                                label: 'Assignment',
                                // label: <Link to='/assignment'>Assignment</Link>,
                                // onClick: () => setNavKey(3),
                                // render: () => <></>
                                // onClick: () => handleTabClick('/assignment')
                                onClick: () => history.push('/assignment')
                            }
                        ]}
                    />
                </Sider>
                <Layout>
                    <Content
                        style={{
                            // margin: '24px 16px',
                            // padding: 24,
                            minHeight:'78vh',
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