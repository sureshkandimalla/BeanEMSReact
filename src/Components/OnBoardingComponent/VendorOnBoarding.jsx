import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Modal ,Input, Form, Row, Col, Card, Radio, Button, DatePicker } from 'antd';
import { validateEmail } from '../../utils';
import Sidebar from '../../Commons/Sidebar/Sidebar';
import './EmployeeOnBoarding.scss';
import moment from 'moment';


const VendorOnBoardingForm = () => {

    const [form] = Form.useForm();
    const history = useHistory();
    const [generalDetails, setGeneralDetails] = useState({ vendorName: '', vendorCompanyName: '', ein: '', phone: '', emailId: '', webSite: '', startDate: null, endDate: null, zipCode: '' });

    const handleFormSubmit = (generalDetails) => {
        //api should be called here

        axios.post('http://localhost:8080/api/v1/customers/saveOnBoardDetails', generalDetails)
            .then(response => {
                if (response && response.data) {
                    // Display success message
                    Modal.success({
                        content: 'Data saved successfully',
                        onOk: () => history.push('/vendor')
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
            vendorName: '',
            vendorCompanyName: '',
            ein: '',
            phone: '',
            emailId: '',
            webSite:'',
            startDate: null,
            endDate: null,
          });
    }
    const handleCancel = () => {
        history.push('/vendor')

    }

    const handleSubmit = () => {
        // Validate the form data
        if (!generalDetails.vendorName || !generalDetails.ein || !generalDetails.phone || !generalDetails.emailId || !generalDetails.startDate) {
          alert('Please fill in all mandatory fields');
          return;
        }
        alert("handleSubmit");
    console.log("generalDetails: "+generalDetails);
        // Make API call with formData
        handleFormSubmit(generalDetails);
    
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


    const handleGeneralData = (value, field) => {
        setGeneralDetails(prevState => ({
            ...prevState,
            [field]: value
        }));
    }

    return (
        <Sidebar>
            <div className='employee-onboarding-form'>
                <h3 className='header'>Onboard Vendor(s)</h3>
                <Card className='employee-onboard-card'>
                    <Form form={form}>
                        <Row className='card-header-section'>
                            <Col>
                                <h4 className='header'>Vendor Details</h4>
                            </Col>
                            <Col>
                                <span>Mandatory Fields are marked with <span className='asterisk'>*</span></span>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Vendor Name" name="Vendor Name" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'vendorName')} value={generalDetails.vendorName} />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Vendor Company Name" name="Vendor Company Name" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'vendorCompanyName')} value={generalDetails.vendorCompanyName} />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="ein" name="ein" rules={[{ required: true }]}>
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'ein')} value={generalDetails.ein} />
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
                                <Form.Item label="Phone" name="Phone" rules={[{ required: true, message: '' }, { validator: handleEmailValidation }]}>
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'phone')} value={generalDetails.phone} />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="WebSite" name="webSite" >
                                    <Input onChange={(e) => handleGeneralData(e.target.value, 'webSite')} value={generalDetails.webSite} />
                                </Form.Item>
                            </Col>                            
                        </Row>
                        <Row gutter={30}>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Start Date">
                                <DatePicker
                                    onChange={(date, dateString) => handleGeneralData(dateString, 'startDate')}
                                    className='dobDatepicker'
                                    value={generalDetails.startDate ? moment(generalDetails.startDate) : null}
                                    //disabledDate={current => current && current < moment().startOf('day')}
                                />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="End Date">
                                <DatePicker
                                    onChange={(date, dateString) => handleGeneralData(dateString, 'endDate')}
                                    className='dobDatepicker'
                                    value={generalDetails.endDate ? moment(generalDetails.endDate) : null}
                                    //disabledDate={current => current && current < moment().startOf('day')}
                                />
                                </Form.Item>
                            </Col>   
                        </Row>
                        <section className='header'>
                            <h3>Address</h3>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="Address Line 1">
                                        <Input onChange={(e) => handleGeneralData(e.target.value, 'address_line_1')} value={generalDetails.address_line_1} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Address Line 2">
                                        <Input onChange={(e) => handleGeneralData(e.target.value, 'address_line_2')} value={generalDetails.address_line_2} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <Form.Item label="City, State">
                                        <Input onChange={(e) => handleGeneralData(e.target.value, 'city')} value={generalDetails.city} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Zip Code">
                                        <Input onChange={(e) => handleGeneralData(e.target.value, 'zipCode')} value={generalDetails.zipCode} />
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

export default VendorOnBoardingForm;
