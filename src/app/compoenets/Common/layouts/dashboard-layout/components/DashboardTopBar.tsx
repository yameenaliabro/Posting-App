"use client";
import React, { useMemo } from 'react'
import { Layout, MenuProps, Typography, Dropdown, Avatar } from "antd"
import { UseAuth } from '@src/app/hooks'

const DashboardTopBar = () => {
    const { Header } = Layout
    const { signout } = UseAuth()

    const items: MenuProps["items"] = useMemo(() => ([
        { label: "Signout", onClick: signout, key: "signout" }
    ]), [signout])

    return (
        <Header className='flex justify-between item-center'>
            <Typography.Title className='text-white'>Dashboard</Typography.Title>
            <Dropdown arrow placement="bottomRight" menu={{ items }} className='mt-4'>
                <Avatar src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" />
            </Dropdown>
        </Header>
    )
}

export default DashboardTopBar