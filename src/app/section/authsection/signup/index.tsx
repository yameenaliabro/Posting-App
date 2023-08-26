"use client";
import { UserOutlined, MailOutlined } from '@ant-design/icons'
import UseAuth from '@src/app/hooks/auth/UseAuth';
import { signup } from '@src/app/types/auth'
import { Card, Form, Input, Typography, Button, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Link from 'next/link'
import React, { useCallback } from 'react'

const Signup = () => {
    const { signup } = UseAuth()
    const [form] = useForm()
    const onFinish = useCallback(async (value: signup) => {
        try {
            await signup(value)
            message.success("login sucessfull")
            form.resetFields()

        } catch (error) {
            console.log("🚀 ~ file: index.tsx:14 ~ onFinish ~ error):", error)
        }
    }, [, form, signup])

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <Card
                title={<Typography.Title className="text-center">Create  Account</Typography.Title>}
                className='flex flex-col bg-gray-100 p-5'
            >
                <Form
                    className='w-[350px] h-[370px] '
                    onFinish={onFinish}
                    form={form}
                >
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
                        <Input type='email' placeholder='Enter a email address' prefix={<MailOutlined />} />
                    </Form.Item>

                    <Form.Item
                        rules={[
                            { required: true, message: "please enter a password!" },
                            { min: 6, message: "passowrd must be the six character!" }
                        ]}
                        name="password"
                    >
                        <Input.Password placeholder='Enter a password' />
                    </Form.Item>

                    <Form.Item
                        rules={[
                            { required: true, message: "please enter a repeat password!" },
                            { min: 6, message: "repeat passowrd must be the six character!" }

                        ]}
                        name="repeatpassword"
                    >
                        <Input.Password placeholder='Enter a Repeat Password' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type='primary' block>Signup</Button>
                    </Form.Item>

                    <Form.Item className='flex justify-center items-center mt-0 pt-0'>
                        <Link href="/auth/signin" >Alreadey have Account<Button htmlType="submit" type='link' className='ml-0 pl-1'>Singin?</Button></Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Signup 