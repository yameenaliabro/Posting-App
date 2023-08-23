"use client";
import React, { use, useCallback } from 'react'
import { Card, Form, Input, Button, Typography, message } from "antd"
import Link from 'next/link'
import { signin } from '@src/app/types/auth';
import { useForm } from 'antd/es/form/Form';
import UseAuth from '@src/app/hooks/auth/UseAuth';
const Singin = () => {
    const { signin, user, isAuthenticated } = UseAuth()
    const [form] = useForm()

    const onFinish = useCallback(async (value: signin) => {
        console.log("🚀 ~ file: index.tsx:14 ~ onFinish ~ value:", value)
        try {
            await signin(value)
            message.success("login sucessfull")
            form.resetFields()
            console.log("🚀 ~ file: index.tsx:20 ~ onFinish ~  isAuthenticated:", isAuthenticated)

        } catch (error) {
            console.log("🚀 ~ file: index.tsx:14 ~ onFinish ~ error):", error)
        }
    }, [signin, form, isAuthenticated])

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <Card
                title={<Typography.Title className='text-center'>Signin</Typography.Title>}
                className='flex flex-col p-5 bg-gray-100'
            >
                <Form
                    className='w-[350px] h-[200px]'
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item rules={[
                        { required: true, message: "please enter a email address!" }
                    ]}
                        name="email"
                    >
                        <Input type='email' placeholder='enter a email address!' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "please enter a password!" },
                            { min: 6, message: "must be a six character" }
                        ]}
                    >
                        <Input.Password type='password' placeholder='enter a password' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' block htmlType="submit">Signin</Button>
                    </Form.Item>
                    <Form.Item className='text-center'>
                        <Link href="/auth/signup">Create a New Accoutn<Button type="link" className='pl-1'>Singup?</Button></Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Singin