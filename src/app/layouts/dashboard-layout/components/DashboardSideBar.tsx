import { Layout, Menu, MenuProps, } from 'antd'
import Link from 'next/link'
import React, { useMemo } from 'react'

const { Sider } = Layout

function DashboardSideBar() {

    const menuItems: MenuProps["items"] = useMemo(() => ([
        {
            label: <Link href="/dashboard">Dashboard</Link>,
            key: "dashboard"
        },
    ]), [])

    return (
        <Sider className='h-full'>
            <Menu items={menuItems} theme="dark" />
        </Sider>
    )
}

export default DashboardSideBar
