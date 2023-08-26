"use client";
import { UseAuth, UsePost } from '@src/app/hooks';
import { getpostprop } from '@src/app/types'
import { Button, Form, Input, Modal, Popconfirm } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useCallback } from 'react'

interface editModalProps {
    visible: boolean,
    post: getpostprop | null,
    onSave: (id: string, editedvalue: getpostprop) => void
    onCancel: () => void
}

function UpdateModal({ onCancel, onSave, post, visible }: editModalProps) {
    const { user } = UseAuth()
    const { loading } = UsePost()
    const [form] = useForm()
    const handleSave = useCallback(() => {
        form.validateFields().then(values => {
            onSave(post?.id as string, values);
        });
    }, [onSave, post, form])


    return (
        <Modal
            title={`${user?.displayName} edit Post`}
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Popconfirm key={post?.id}
                    title="are you sure you want to the not edit post"
                    okText="ok"
                    cancelText="cancel"
                    onConfirm={onCancel}
                >
                    <Button>Cancel</Button>
                </Popconfirm >,
                <Popconfirm
                    title="are you sure you want to edit the post "
                    key={post?.id}
                    okText="ok"
                    cancelText="cancel"
                    onConfirm={handleSave}
                >
                    <Button type='primary' loading={loading}>Edit</Button>
                </Popconfirm>
            ]}
        >
            <Form
                disabled={loading}
                form={form}
                initialValues={post as getpostprop}
            >
                <Form.Item
                    name="title"
                    rules={[
                        { required: true, message: "please enter title" },
                    ]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item name="description"
                    rules={[{ required: true, message: "please enter a description" }]}
                >
                    <Input.TextArea
                        rows={4}
                    >
                    </Input.TextArea>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateModal