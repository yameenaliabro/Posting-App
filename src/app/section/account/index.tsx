"use client";
import React from 'react';
import { Avatar, Button, Card, Divider, Input } from 'antd';
import { UseAuth } from '@src/app/hooks';

const ProfileCard = () => {
    const { user } = UseAuth()
    return (
        <div
            className='gird grid-cols-1 p-10 w-[500px] h-[400px]'>
            <Card
                hoverable
                className='flex-1 '
            >
                <Card.Meta
                    avatar={<Avatar src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" />}
                    title={user?.displayName}
                    description={user?.email}
                />
            </Card>
        </div>
    );
};

export default ProfileCard;
