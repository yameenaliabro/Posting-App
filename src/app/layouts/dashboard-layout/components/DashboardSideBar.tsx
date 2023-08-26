import { HomeOutlined, MailOutlined, NodeCollapseOutlined, UpOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps, } from 'antd'
import Link from 'next/link'
import React, { useMemo } from 'react'

const { Sider } = Layout

function DashboardSideBar() {

    const menuItems: MenuProps["items"] = useMemo(() => ([
        {
            label: <Link href="/">Home</Link>, icon: <HomeOutlined />,
            key: "dashboard"
        },
        {
            label: <Link href="/all-posts">All Posts</Link>, icon: <UpOutlined />,
            key: "allposts"
        },
        {
            label: <Link href="/account">Account</Link>, icon: <UserOutlined />,
            key: "posts"
        },
    ]), [])

    return (
        <Sider className='h-full'>
            <Menu items={menuItems} theme="dark" />
        </Sider>
    )
}

export default DashboardSideBar
