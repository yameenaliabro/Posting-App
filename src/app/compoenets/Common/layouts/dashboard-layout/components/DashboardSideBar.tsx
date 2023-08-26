"use client"
import { HomeOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps, } from 'antd'
import Link from 'next/link'
import React, { useMemo } from 'react'

const { Sider } = Layout

function DashboardSideBar() {
    const menuItems: MenuProps["items"] = useMemo(() => ([
        {
            label: <Link href="/dashboard">Dashboard</Link>, icon: <HomeOutlined />,
            key: "dashboard"
        },
    ]), [])

    return (
        <Sider>
            <Menu theme='dark' items={menuItems} />
        </Sider>
    )
}

export default DashboardSideBar
