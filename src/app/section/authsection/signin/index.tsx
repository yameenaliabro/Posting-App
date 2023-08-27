"use client";
import React, { use, useCallback } from 'react'
import { Card, Form, Input, Button, Typography, message, Divider, Image } from "antd"
import Link from 'next/link'
import { signin } from '@src/app/types/auth';
import { useForm } from 'antd/es/form/Form';
import UseAuth from '@src/app/hooks/auth/UseAuth';
import { FONT_MANIFEST } from 'next/dist/shared/lib/constants';
import { GoogleOutlined } from '@ant-design/icons';
const Singin = () => {
    const { signin, signupWithGoogle, loading } = UseAuth()
    const [form] = useForm()

    const onFinish = useCallback(async (value: signin) => {
        console.log("🚀 ~ file: index.tsx:14 ~ onFinish ~ value:", value)
        try {
            await signin(value)
            message.success("login sucessfull")
            form.resetFields()

        } catch (error) {
            console.log("🚀 ~ file: index.tsx:14 ~ onFinish ~ error):", error)
        }
    }, [signin, form])

    const googelSinguphandler = useCallback(async () => {
        try {
            await signupWithGoogle()
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:30 ~ googelSinguphandler ~ error:", error)
        }
    }, [signupWithGoogle])


    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <Card
                title={<Typography.Title className='text-center'>Signin</Typography.Title>}
                className='flex flex-col p-5 bg-gray-100'
            >
                <Form
                    className='w-[350px] h-[350px]'
                    onFinish={onFinish}
                    form={form}
                    disabled={loading}
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
                        <Button type='primary' block htmlType="submit" loading={loading}>Signin</Button>
                    </Form.Item>
                    <Form.Item className='text-center'>
                        <Link href="/auth/signup">Create a New Account<Button type="link" className='pl-1'>Singup?</Button></Link>
                    </Form.Item>
                    <Divider>or</Divider>
                    <Form.Item className='text-center'>
                        <Button icon={<GoogleOutlined />} className='bg-cyan-500 text-white shadow-sm'
                            onClick={googelSinguphandler}>Sign up With Google</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    )
}

export default Singin