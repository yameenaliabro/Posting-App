"use client";
import React, { use, useState } from 'react';
import { Avatar, Button, Divider, Form, Input, Typography, message } from 'antd';
import { UseAuth } from '@src/app/hooks';

const ProfileCard = () => {
    const { user, signout: signOut, updateProfileInfo } = UseAuth()
    const [form] = Form.useForm();
    const [editing, setEditing] = useState(false);

    const handleEdit = () => {
        setEditing(true);
        form.setFieldsValue({
            displayName: user?.displayName,
            email: user?.email,
        });
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            await updateProfileInfo(values);
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
            <div className="flex items-center">
                <Avatar size={100} src={user?.photoURL} />
                <Typography.Title className='ml-2' level={2}>{user?.displayName}</Typography.Title>
            </div>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    displayName: user?.displayName,
                    email: user?.email,
                }}
            >
                <Form.Item name="displayName" label={user?.displayName}>
                    <Input disabled={!editing} />
                </Form.Item>
                <Form.Item name="email" label="Email">
                    <Input disabled={!editing} />
                </Form.Item>
                {editing ? (
                    <>
                        <Form.Item>
                            <Button type="primary" onClick={handleSave}>
                                Save
                            </Button>
                            <Button onClick={() => setEditing(false)} className="ml-2">
                                Cancel
                            </Button>
                        </Form.Item>
                    </>
                ) : (
                    <Button type="primary" onClick={handleEdit}>
                        Edit Profile
                    </Button>
                )}
            </Form>
            <Divider />
            <Button
                type="primary"
                className="w-full mt-4"
            >
                Sign Out
            </Button>
        </div>
    );
};

export default ProfileCard;
