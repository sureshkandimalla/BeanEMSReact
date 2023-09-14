import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Input, Form, Row, Col, Card, Radio, Button, DatePicker } from 'antd';
import { validateEmail } from '../../utils';
import Sidebar from '../../Commons/Sidebar/Sidebar';
import './EmployeeOnBoarding.scss';



const EmployeeOnBoardingForm = () => {

    const [form] = Form.useForm();
    const history = useHistory();
    const [generalDetails, setGeneralDetails] = useState({ firstName: '', lastName: '', emailId: '', dob: '', gender: '', ssn: '', referredBy: '' });
    const [employeeAddress, setEmployeeAddress] = useState({ address: '', city: "Frsco", state: '', zipCode: '', country: '' });
    const [addressNotes, setAddressNotes] = useState([{ notesType: '', details: '' }]);
    const [employeeImmigrationDetails, setEmployeeImmigrationDetails] = useState([{
        visaType: '', visaStartDate: '', visaEndDate: '', immigrationNotes: [{ notesType: '', details: '', createdDate: '', endDate: '' }],
    }]);
    const [employmentWage, setemploymentWage] = useState([{
        wage: '', startDate: '', wageNotes: [{ notesType: '', details: '' }],
    }])
    const [employmentDetails, setEmploymentDetails] = useState([
        { designation: '', lcaNumber: '', employmentStartDate: '', employmentEndDate: '' }
    ])
    const [employeeNotes, setEmployeeNotes] = useState([{ notesType: '', details: '' }]);
    const [projects, setProjects] = useState([{
        projectName: '',
        vendor: '',
        client: ''
    }]);
    const [billRate, setBillRate] = useState([
        { wage: '', startDate: '', wageNotes: '', createdDate: '', endDate: '' }
    ])
    const [formObj, setFormObj] = useState({});

    const handleFormSubmit = () => {
        //api should be called here

        axios.post('http://localhost:8080/api/v1/employees', generalDetails)
            .then(response => response.json())
            .then(data => {
                console.log("newData--", data);
            })
            .catch(error => console.error('Error posting data:', error));
    }


    const handleSubmit = () => {
        form.submit()
        // .then(() => {
            history.push('/employee')
        // })

    }


    const handleEmailValidation = () => {
        if (!generalDetails.emailId.length) {
            return Promise.reject(new Error('Email is required'))
        }
        else if (generalDetails.emailId.length && !validateEmail(generalDetails.emailId)) {
            return Promise.reject(new Error('Invalid Email'));
        }
        return Promise.resolve();
    }

    const handleChange = (e, field) => {
        const { value } = e.target;
        let formsObj = { ...formObj };
        formsObj[field] = value;
        setFormObj(formsObj)
    }

    const handleGeneralData = (e, field) => {
        let details = { ...generalDetails }
        const { value } = e.target;
        details[field] = value;
        setGeneralDetails(details);
    }

    const handleDobUpdate = (e) => {
        let details = { ...generalDetails }
        details['dob'] = e;
        setGeneralDetails(details);
    }

    const handleDobdates = (current) => {
        // console.log("print---", dayjs().toDate(), current.toDate())
        return current && current.valueOf() > Date.now();
    }

    return (
        <Sidebar>
            <div className='employee-onboarding-form'>
                <h3 className='header'>Onboard Candidate(s)</h3>
                <Card className='employee-onboard-card'>
                    <Form onFinish={handleFormSubmit} form={form}

                    // labelCol={{
                    //     span: 7,
                    // }}
                    //   wrapperCol={{
                    //     span: 30,
                    //   }}
                    >
                        <Row className='card-header-section'>
                            <Col>
                                <h4 className='header'>Employee Details</h4>
                            </Col>
                            <Col>
                                <span>Mandatory Fields are marked with <span className='asterisk'>*</span></span>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={8} className='form-row'>
                                <Form.Item label="First Name" name="First Name" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleGeneralData(e, 'firstName')} value={formObj.firstName} />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Last Name" name="Last Name" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleGeneralData(e, 'lastName')} value={formObj.lastName} />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Designation" name="Designation" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleChange(e, 'designation')} value={formObj.designation} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Email ID" name="Email ID" rules={[{ required: true, message: '' }, { validator: handleEmailValidation }]}>
                                    <Input onChange={(e) => handleGeneralData(e, 'emailId')} value={generalDetails.emailId} />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Date of Birth">
                                    {/* <Input onChange={(e) => handleGeneralData(e, 'dob')} value={formObj.dob} /> */}
                                    <DatePicker onChange={handleDobUpdate} className='dobDatepicker' disabledDate={handleDobdates} />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Gender">
                                    <Radio.Group onChange={e => handleGeneralData(e, 'gender')} value={generalDetails.gender}>
                                        <Radio value="female">Female</Radio>
                                        <Radio value="male">Male</Radio>
                                        <Radio value="none">I choose not to disclose</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <section className='header'>
                            <h3>Home Address</h3>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Address Line 1">
                                        <Input onChange={(e) => handleChange(e, 'address_line_1')} value={formObj.address_line_1} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Address Line 2">
                                        <Input onChange={(e) => handleChange(e, 'address_line_2')} value={formObj.address_line_2} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="City, State">
                                        <Input onChange={(e) => handleChange(e, 'city')} value={formObj.city} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Zip Code">
                                        <Input onChange={(e) => handleChange(e, 'zipCode')} value={formObj.zipCode} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </section>
                        <section className='header'>
                            <h3>Employement Details</h3>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Employement Type" name="Employement Type" rules={[{ required: true }]}>
                                        <Input onChange={(e) => handleChange(e, 'employementType')} value={formObj.employmentType} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Tax Terms" name="Tax Terms" rules={[{ required: true }]}>
                                        <Input onChange={(e) => handleChange(e, 'taxTerms')} value={formObj.taxterms} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Employement Start Date">
                                        <Input onChange={(e) => handleChange(e, 'empStartDate')} value={formObj.empStartDate} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Employee ID">
                                        <Input onChange={(e) => handleChange(e, 'empID')} value={formObj.empID} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Current Work Authorization Type">
                                        <Input onChange={(e) => handleChange(e, 'workAuthType')} value={formObj.workAuthType} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} className='form-row'>
                                    <Form.Item label="Billing Status">
                                        <Radio.Group onChange={(e) => handleChange(e, 'billingStatus')} value={formObj.billingStatus}>
                                            <Radio value="billing">Billing</Radio>
                                            <Radio value="nonBilling">Non-Billing</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Wage rate(Offered Salary)">
                                        <Input onChange={(e) => handleChange(e, 'wageType')} value={formObj.wageType} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} className='form-row'>
                                    <Form.Item label="Wage Cycle">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Department">
                                        <Input onChange={(e) => handleChange(e, 'department')} value={formObj.department} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} className='form-row'>
                                    <Form.Item label="Reporting To">
                                        <Input onChange={(e) => handleChange(e, 'reportingTo')} value={formObj.reportingTo} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </section>
                        <hr />
                        <section>
                            <Row gutter={10} className='footer-btn-wrapper'>
                                <Col>
                                    <Button type="primary">Back</Button>
                                </Col>
                                <Col>
                                    <Button>Cancel</Button>
                                </Col>
                                <Col>
                                    <Button type="primary" onClick={handleSubmit}>Onboard</Button>
                                </Col>
                            </Row>
                        </section>
                    </Form>
                </Card>
            </div>
        </Sidebar>
    )
}

export default EmployeeOnBoardingForm;
