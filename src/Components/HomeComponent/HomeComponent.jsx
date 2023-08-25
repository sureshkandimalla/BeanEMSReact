import React from 'react';
import { Tabs } from 'antd';
import { FaCog } from 'react-icons/fa';
import EmployeeListGridComponent from '../EmployeeListGridComponent/EmployeeListGridComponent';
import './HomeComponent.scss'


const HomeComponent = () => {
    const { TabPane } = Tabs;
    const toggleTabs = (e) => {
    }

    const modifyTableColumns = (e) => {
        console.log("e--", e)
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
        <div >
            <Tabs className='bean-home-tabs' defaultActiveKey="1" onChange={toggleTabs} items={items}
                tabBarExtraContent={<FaCog className='modify-columns-icon' onClick={modifyTableColumns} />}>
                {/* <TabPane tab="Tab 1" key="1">
                    <EmployeeListGridComponent />
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane> */}
            </Tabs>
        </div>

    )
}

export default HomeComponent;
