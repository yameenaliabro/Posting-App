import { HomeOutlined, MailOutlined, NodeCollapseOutlined, UpOutlined, UserOutlined } from '@ant-design/icons'
import { Image, Layout, Menu, MenuProps, Typography, } from 'antd'
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
        <Sider className='sticky top-0 left-0'>
            <Menu items={menuItems} theme="dark" className='sticky top-20 left-0 mt-20' />
        </Sider>
    )
}

export default DashboardSideBar
