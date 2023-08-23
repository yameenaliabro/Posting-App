import React, { useMemo } from 'react'
import { Layout, Menu, MenuProps } from "antd"
import Link from 'next/link'

function MainLayout() {
    const { Header } = Layout

    const menuItem: MenuProps["items"] = useMemo(() => ([
        {
            label: <Link href="/">Home</Link>, key: "Home"
        },
        {
            label: <Link href="/create-blog">CreateBlog</Link>, key: "Home"
        },
        {
            label: <Link href="all-blog">AllBlog</Link>, key: "Home"
        },
        {
            label: <Link href="/profile">Profile</Link>, key: "Home"
        },
    ]), [])

    return (
        <div>
            <Header>
                <Menu
                    items={menuItem}
                />
            </Header>
        </div>
    )
}

export default MainLayout