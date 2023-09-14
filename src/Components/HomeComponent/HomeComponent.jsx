import React from 'react';
import { Tabs, Button } from 'antd';
import { FaCog } from 'react-icons/fa';
import {useHistory} from "react-router-dom";
import EmployeeListGridComponent from '../EmployeeListGridComponent/EmployeeListGridComponent';
import Sidebar from '../../Commons/Sidebar/Sidebar';
import './HomeComponent.scss'


const HomeComponent = () => {
    const { TabPane } = Tabs;
    const history = useHistory();

    const toggleTabs = (e) => {
    }
    

    const modifyTableColumns = (e) => {
        history.push('/onboarding')
    }

    const items = [
        {
            key: 1,
            label: 'Employee List',
            children: <EmployeeListGridComponent />
        },
        {
            key: 2,
            label: 'Invoices'
        },
    ]

    return (
        <Sidebar>
            <Tabs className='bean-home-tabs' defaultActiveKey="1" onChange={toggleTabs} items={items}
                // tabBarExtraContent={<FaCog className='modify-columns-icon' onClick={modifyTableColumns} />}
                tabBarExtraContent={<Button type="primary" className='modify-columns-icon' onClick={modifyTableColumns}>Add New Employee</Button>}
                >
                {/* <TabPane tab="Tab 1" key="1">
                    <EmployeeListGridComponent />
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane> */}
            </Tabs>
        </Sidebar>

    )
}

export default HomeComponent;
