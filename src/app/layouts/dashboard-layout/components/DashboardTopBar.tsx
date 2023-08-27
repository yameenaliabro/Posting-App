"use client";
import React, { useMemo } from 'react'
import { Avatar, Col, Dropdown, Layout, MenuProps, Row, Typography } from 'antd';
import { UseAuth } from '@src/app/hooks';
import { PoweroffOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Header } = Layout

function DashboardTopBar() {

    const { signout, user } = UseAuth();

    const avatarOption: MenuProps["items"] = useMemo(() => ([
        {
            label: `${user?.displayName}`, key: "user"
        },
        {
            label: "Signout", onClick: signout, key: "signout", icon: <PoweroffOutlined />
        },
        {
            label: <Link href="/account">Account</Link>, key: "account", icon: <UserOutlined />
        }, {
            label: "Setting", key: "setting", icon: <SettingOutlined />
        },

    ]), [signout, user])

    return (
        <Header>
            <Row
                justify={'center'}
                align={"middle"}
            >
                <Col flex={1} >
                    <Typography.Title className='text-white' level={3} >Posting Application</Typography.Title >
                </Col>
                <Col>
                    <Dropdown arrow placement='bottom' menu={{ className: "w-40 sticky top-0 left-0", items: avatarOption }}>
                        <Avatar src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" />
                    </Dropdown>
                </Col>
            </Row>

        </Header >
    )
}


export default DashboardTopBar