"use client";
import { Layout } from 'antd'
import React, { ReactNode } from 'react'
import { DashboardSideBar, DashboardTopBar } from './components'
import AuthGuard from '@src/app/guard'

const { Content } = Layout

type DashboardLayoutProps = {
    children: ReactNode
}

function DashboardLayout(props: DashboardLayoutProps) {
    const { children } = props

    return (
        <Layout>
            <DashboardTopBar />
            <Layout className='h-[1000px]'>
                <DashboardSideBar />
                <Content className='h-full'>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

const WithAuth = (props: DashboardLayoutProps) => {
    return (
        <AuthGuard>
            <DashboardLayout {...props} />
        </AuthGuard>
    )
}

export default WithAuth 