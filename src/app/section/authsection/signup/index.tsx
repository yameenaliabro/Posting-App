import { UserOutlined, MailOutlined } from '@ant-design/icons'
import { Card, Form, Input } from 'antd'
import React from 'react'

const Signup = () => {
    return (
        <div>
            <Card>
                <Form>
                    <Form.Item
                        rules={[
                            { required: true, message: "please enter a fistname!" }
                        ]}
                        name="firstname"
                    >
                        <Input type='text' placeholder='Enter a FirstName' prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item
                        rules={[
                            { required: true, message: "please enter a lastname" }
                        ]}
                        name="lastname"
                    >
                        <Input type='text' placeholder='Enter a lastname' prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item
                        rules={[
                            { required: true, message: "please enter email address!" }
                        ]}
                        name="email"
                    >
                        <Input type='text' placeholder='Enter a email address' prefix={<MailOutlined />} />
                    </Form.Item>

                    <Form.Item
                        rules={[
                            { required: true, message: "please enter a password!" }
                        ]}
                        name="password"
                    >
                        <Input.Password type='text' placeholder='Enter a password' prefix={<UserOutlined />} />
                    </Form.Item>
                </Form>
            </Card>

        </div>
    )
}

export default Signup 