"use client";
import React, { useMemo } from 'react'
import { Avatar, Dropdown, Layout, MenuProps, Typography } from 'antd';
import { UseAuth } from '@src/app/hooks';
import { PoweroffOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout

function DashboardTopBar() {

    const { signout, user } = UseAuth();

    const avatarOption: MenuProps["items"] = useMemo(() => ([
        {
            label: "Signout", onClick: signout, key: "signout", icon: <PoweroffOutlined />
        },
        {
            label: "Acount", key: "account", icon: <UserOutlined />
        }, {
            label: "Setting", key: "setting", icon: <SettingOutlined />
        },
        {
            label: `${user?.displayName}`, key: "user"
        }
    ]), [signout, user])

    return (
        <Header className='flex justify-between items-center w-full h-full'>
            <Typography.Title className='text-white' level={3}>Todo App</Typography.Title>
            <Dropdown arrow placement='bottom' menu={{ className: "w-40", items: avatarOption }}>
                <Avatar src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" />
            </Dropdown>
        </Header>
    )
}


export default DashboardTopBar