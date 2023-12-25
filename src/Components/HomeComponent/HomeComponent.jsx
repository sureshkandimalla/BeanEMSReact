import React from 'react';
import { Tabs, Button } from 'antd';
import {useHistory} from "react-router-dom";
import EmployeeListGridComponent from '../EmployeeListGridComponent/EmployeeListGridComponent';
import Sidebar from '../../Commons/Sidebar/Sidebar';
import './HomeComponent.scss'
import ActiveInvoicesComponent from "../ActiveInvoicesComponent/ActiveInvoicesComponent";


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
            children: <EmployeeListGridComponent/>
        },
        {
            key: 2,
            label: 'Invoices',
            children: <ActiveInvoicesComponent/>
        },
    ]

    return (
        <Sidebar>
            <Tabs className='bean-home-tabs' defaultActiveKey="1" onChange={toggleTabs} items={items}
                tabBarExtraContent={<Button type="primary" className='modify-columns-icon' onClick={modifyTableColumns}>Add New Employee</Button>}>
            </Tabs>
        </Sidebar>

    )
}

export default HomeComponent;
