"use client";
import React from 'react'
import { Card, Form, Input, Button, Typography } from "antd"
import { UseAuth } from '@src/app/hooks';
const CreateBlog = () => {
    const { user } = UseAuth()
    console.log("🚀 ~ file: index.tsx:7 ~ CreateBlog ~ user :", user)
    const onFinish = () => {

    }

    return (
        <div className="flex items-start flex-col p-10">
            <Card
                className="flex bg-gray-50 flex-col"
                title={<Typography.Title>Create  A Blog</Typography.Title>}
            >
                <Form
                    onFinish={onFinish}
                    className="w-[350px] h-[200px]"
                >
                    <Form.Item
                        rules={[
                            { required: true, message: 'please enter a title' },
                            { min: 5, message: "must be the 5 cahracter" },
                            { max: 15, message: "more than 50 character" }
                        ]}
                        name="title"
                    >
                        <Input type='text' placeholder='enter a title' />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            { required: true, message: "please enter a description!" },
                            { min: 10, message: "must be the 10 character!" },
                            { max: 100, message: "more than 100 character" }
                        ]}
                        name="description"
                    >
                        <Input.TextArea rows={4} placeholder='What is Your mind' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary'>Publish</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    )
}

export default CreateBlog