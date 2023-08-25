import { Input, Form, Row, Col, Card, Radio, Button } from 'antd';
import React, { useState, useRef } from 'react';
import { validateEmail } from '../../utils';
import './EmployeeOnBoarding.scss'



const EmployeeOnBoardingForm = () => {

    const [form] = Form.useForm();

    const [formObj, setFormObj] = useState({
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        dob: '',
        gender: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        zipCode: ''
    });

    const handleFormSubmit = () => {
        //api should be called here
    }

    const handleEmailValidation = () => {
        if (!formObj.email.length) {
            return Promise.reject(new Error('Email is required'))
        }
        else if (formObj.email.length && !validateEmail(formObj.email)) {
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

    return (
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
                                <Input onChange={(e) => handleChange(e, 'firstName')} value={formObj.firstName} />
                            </Form.Item>
                        </Col>
                        <Col span={8} className='form-row'>
                            <Form.Item label="Last Name" name="Last Name" rules={[{ required: true }]}>
                                <Input onChange={(e) => handleChange(e, 'lastName')} value={formObj.lastName} />
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
                                <Input onChange={(e) => handleChange(e, 'email')} value={formObj.email} />
                            </Form.Item>
                        </Col>
                        <Col span={8} className='form-row'>
                            <Form.Item label="Date of Birth">
                                <Input onChange={(e) => handleChange(e, 'dob')} value={formObj.dob} />
                            </Form.Item>
                        </Col>
                        <Col span={8} className='form-row'>
                            <Form.Item label="Gender">
                                <Radio.Group onChange={e => handleChange(e, 'gender')} value={formObj.gender}>
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
                                <Button type="primary" onClick={() => form.submit()}>Onboard</Button>
                            </Col>
                        </Row>
                    </section>
                </Form>
            </Card>
        </div>
    )
}

export default EmployeeOnBoardingForm;
