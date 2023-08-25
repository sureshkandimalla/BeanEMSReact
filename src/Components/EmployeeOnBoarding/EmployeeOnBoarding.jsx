import { Input, Form, Row, Col, Card, Radio, Button } from 'antd';
import React, { useState, useRef } from 'react';
import './EmployeeOnBoarding.scss'



const EmployeeOnBoardingForm = () => {


    return (
        <div className='employee-onboarding-form'>
            <h3 className='header'>Onboard Candidate(s)</h3>
            <Card className='employee-onboard-card'>
                <Form
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
                            <Form.Item label="First Name" name="firstName" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} className='form-row'>
                            <Form.Item label="Last Name" name="lastName" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} className='form-row'>
                            <Form.Item label="Designation" name="designation" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={30}>
                        <Col span={8} className='form-row'>
                            <Form.Item label="Email ID" name="emailID" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} className='form-row'>
                            <Form.Item label="Date of Birth">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} className='form-row'>
                            <Form.Item label="Gender">
                                <Radio.Group>
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
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Address Line 2">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={8}>
                                <Form.Item label="City, State">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Zip Code">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </section>
                    <section className='header'>
                        <h3>Employement Details</h3>
                        <Row gutter={30}>
                            <Col span={8}>
                                <Form.Item label="Employement Type" name="employementType" rules={[{required: true}]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Tax Terms" name="taxterms" rules={[{required: true}]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={8}>
                                <Form.Item label="Employement Start Date">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Employee ID">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={8}>
                                <Form.Item label="Current Work Authorization Type">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Gender">
                                    <Radio.Group>
                                        <Radio value="billing">Billing</Radio>
                                        <Radio value="nonBilling">Non-Billing</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={8}>
                                <Form.Item label="Wage rate(Offered Salary)">
                                    <Input />
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
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8} className='form-row'>
                                <Form.Item label="Reporting To">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </section>
                    <hr />
                    <section>
                        <Row gutter={10} className='footer-btn-wrapper'>
                            <Col>
                                <Button  type="primary">Back</Button>
                            </Col>
                            <Col>
                                <Button>Cancel</Button>
                            </Col>
                            <Col>
                                <Button  type="primary">Onboard</Button>
                            </Col>
                        </Row>
                    </section>
                </Form>
            </Card>
        </div>
    )
}

export default EmployeeOnBoardingForm;
