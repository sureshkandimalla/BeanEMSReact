import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Modal, Input, Form, Row, Col, Card, Radio, Button, DatePicker } from 'antd';
import { validateEmail } from '../../utils';
import Sidebar from '../../Commons/Sidebar/Sidebar';
import './EmployeeOnBoarding.scss';
import moment from 'moment';


const EmployeeOnBoardingForm = () => {

    const [form] = Form.useForm();
    const history = useHistory();
    const [generalDetails, setGeneralDetails] = useState({ firstName: '', lastName: '', designation: '', emailId: '', dob: '', gender: '', ssn: '', visa:'', referredBy: '' });

    const [address, setAddress] = useState({ address_line_1: '', address_line_2: '', city: '', state: '', zipCode: '' })
    const [formObj, setFormObj] = useState({ employmentType: '', taxTerm: '', startDate: '', endDate: '', reportingTo: '', department:'', wageType:'', billingStatus: '' });
    const formData = { ...generalDetails, ...address, ...formObj };

    const handleFormSubmit = (formData) =>{
        //api should be called here
        console.log(address);
        console.log(formObj);
console.log(formData);
        axios.post('http://localhost:8080/api/v1/employees/saveOnBoardDetails', formData)
            .then(response => {
                if (response && response.data) {
                    // Display success message
                    Modal.success({
                        content: 'Data saved successfully',
                        onOk: () => history.push('/employee')
                    });
                } else {
                    // Handle other cases
                    console.log('Response data does not have expected value');
                }
            })
            .catch(error => {
                console.error('Error posting data:', error);
                // Display error message
                Modal.error({
                    content: 'Error posting data. Please try again later.'
                });
            });
    }

    const handleClear= () => {
        form.resetFields();
        setGeneralDetails({
            firstName: '',
            lastName: '',
            emailId: '',
            dob: null,
            gender: '',
            ssn:'',
            visa:'',
            referredBy: ''
          });

          setFormObj({
            employmentType: '',
            taxTerm: '',
            startDate:null,
            endDate:null,
            reportingTo: '',
            department:'',
            wageType:'',
            billingStatus: ''
          });

          setAddress({
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            zipCode: ''
          });
    }

    const handleCancel = () => {
        history.push('/employee')

    }

    const handleSubmit = () => {
        // Validate the form data
        if (!generalDetails.firstName || !generalDetails.lastName || !generalDetails.emailId || !generalDetails.dob || !generalDetails.gender) {
          alert('Please fill in all mandatory fields');
          return;
        }
        alert("handleSubmit");
        console.log("generalDetails: "+generalDetails);
        // Make API call with formData
        handleFormSubmit(formData);
    
        // Clear the form after submission
        //handleClear();
      };

    const handleEmailValidation = () => {
        if (!generalDetails.emailId.length) {
            return Promise.reject(new Error('Email is required'))
        }
        else if (generalDetails.emailId.length && !validateEmail(generalDetails.emailId)) {
            return Promise.reject(new Error('Invalid Email'));
        }
        return Promise.resolve();
    }

    const handleChange = (value, field) => {
        setFormObj(prevState => ({
            ...prevState,
            [field]: value
        }));
    }
    const handleGeneralData = (value, field) => {
        setGeneralDetails(prevState => ({
            ...prevState,
            [field]: value
        }));
    }
    const handleAddressData = (value, field) => {
        setAddress(prevState => ({
            ...prevState,
            [field]: value
        }));
    }
    
    return (
        <Sidebar>
            <div className='employee-onboarding-form'>
                <h3 className='header'>Onboard Candidate(s)</h3>
                <Card className='employee-onboard-card'>
                    <Form form={form}>
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
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'firstName')} value={generalDetails.firstName} />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Last Name" name="Last Name" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'lastName')} value={generalDetails.lastName} />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Designation" name="Designation" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'designation')} value={generalDetails.designation} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Email ID" name="Email ID" rules={[{ required: true, message: '' }, { validator: handleEmailValidation }]}>
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'emailId')} value={generalDetails.emailId} />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Date of Birth">
                                <DatePicker
                                    onChange={(date, dateString) => handleGeneralData(dateString, 'dob')}
                                    className='dobDatepicker'
                                    value={generalDetails.dob ? moment(generalDetails.dob) : null}
                                    disabledDate={current => current && current > moment().endOf('day')}
                                />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Gender">
                                    <Radio.Group onChange={e => handleGeneralData(e.target.value, 'gender')} value={generalDetails.gender}>
                                        <Radio value="female">Female</Radio>
                                        <Radio value="male">Male</Radio>
                                        <Radio value="none">I choose not to disclose</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                        <Col span={8} className='form-row'>
                                <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'phone')} value={generalDetails.phone}  />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="SSN" name="ssn" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'ssn')} value={generalDetails.ssn} maxLength={12}/>
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Visa" name="visa" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'visa')} value={generalDetails.visa} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <section className='header'>
                            <h3>Home Address</h3>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Address Line 1">
                                        <Input onChange={(e) => handleAddressData(e.target.value, 'address_line_1')} value={address.address_line_1} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Address Line 2">
                                        <Input onChange={(e) => handleAddressData(e.target.value, 'address_line_2')} value={address.address_line_2} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="City">
                                        <Input onChange={(e) => handleAddressData(e.target.value, 'city')} value={address.city} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="State">
                                        <Input onChange={(e) => handleAddressData(e.target.value, 'state')} value={address.state} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Zip Code">
                                        <Input onChange={(e) => handleAddressData(e.target.value, 'zipCode')} value={address.zipCode} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </section>
                        <section className='header'>
                            <h3>Employement Details</h3>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Employement Type" name="Employement Type" rules={[{ required: true }]}>
                                        <Input onChange={(e) => handleChange(e.target.value, 'employmentType')} value={formObj.employmentType} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Tax Terms" name="Tax Terms" rules={[{ required: true }]}>
                                        <Input onChange={(e) => handleChange(e.target.value, 'taxTerm')} value={formObj.taxTerm} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Employement Start Date">
                                    <DatePicker
                                    onChange={(date, dateString) => handleChange(dateString, 'startDate')}
                                    className='dobDatepicker'
                                    value={formObj.startDate ? moment(formObj.startDate) : null}
                                    //disabledDate={current => current && current < moment().startOf('day')}
                                />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                <Form.Item label="Employement End Date">
                                    <DatePicker
                                    onChange={(date, dateString) => handleChange(dateString, 'endDate')}
                                    className='dobDatepicker'
                                    value={formObj.endDate ? moment(formObj.endDate) : null}
                                    // disabledDate={current => current && current < moment().startOf('day')}
                                />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Current Work Authorization Type">
                                        <Input onChange={(e) => handleChange(e.target.value, 'workAuthType')} value={formObj.workAuthType} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} className='form-row'>
                                    <Form.Item label="Billing Status">
                                        <Radio.Group onChange={(e) => handleChange(e.target.value, 'billingStatus')} value={formObj.billingStatus}>
                                            <Radio value="billing">Billing</Radio>
                                            <Radio value="nonBilling">Non-Billing</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Wage rate(Offered Salary)">
                                        <Input onChange={(e) => handleChange(e.target.value, 'wageType')} value={formObj.wageType} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} className='form-row'>
                                    <Form.Item label="Wage Cycle">
                                    <Input onChange={(e) => handleChange(e.target.value, 'wageCycle')} value={formObj.wageCycle} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Department">
                                        <Input onChange={(e) => handleChange(e.target.value, 'department')} value={formObj.department} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} className='form-row'>
                                    <Form.Item label="Reporting To">
                                        <Input onChange={(e) => handleChange(e.target.value, 'reportingTo')} value={formObj.reportingTo} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </section>
                        <hr />
                        <section>
                        <Row gutter={30}>
                            <Col span={8} className='form-row'>
                                <Form.Item>
                                    <Button type="primary" onClick={handleClear}>Clear</Button>
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item>
                                    <Button type="primary" onClick={handleCancel}>Cancel</Button>
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>Onboard</Button>
                                </Form.Item>
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
