"use client";
import React, { useCallback, useState } from 'react'
import { Card, Form, Input, Button, Typography, message } from "antd"
import { useForm } from 'antd/es/form/Form';
import { UseAuth, UsePost } from '@src/app/hooks';
import { createpostprop } from '@src/app/types';


const CreateBlog = () => {
    const [form] = useForm()
    const { createPost, loading } = UsePost()

    const onFinish = useCallback(async (prop: createpostprop) => {
        console.log("🚀 ~ file: index.tsx:14 ~ onFinish ~ prop:", prop)
        try {
            await createPost(prop)
            form.resetFields()
            message.success("you post is crated")
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:10 ~ onFinish ~ error:", error)
        } finally {
        }
    }, [form, createPost])

    return (
        <div className="flex items-start flex-col p-5 w-full h-full">
            <Card
                className="flex bg-gray-50 flex-col"
                title={<Typography.Title>Create  A Blog</Typography.Title>}
            >
                <Form
                    onFinish={onFinish}
                    className="w-[400px] h-[300px]"
                    form={form}
                    disabled={loading}
                >
                    <Form.Item
                        rules={[
                            { required: true, message: 'please enter a title' },
                            // { min: 5, message: "must be the 5 cahracter" },
                            // { max: 15, message: "more than 15 character" }
                        ]}
                        name="title"
                    >
                        <Input type='text' placeholder='enter a title' />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            { required: true, message: "please enter a description!" },
                            // { min: 10, message: "must be the 10 character!" },
                            // { max: , message: "more than 100 character" }
                        ]}
                        name="description"
                    >
                        <Input.TextArea rows={4} placeholder='What is Your mind' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' loading={loading}>Publish</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default CreateBlog