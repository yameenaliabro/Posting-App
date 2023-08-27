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
        <Layout className='min-h-[100vh]'>
            <DashboardSideBar />
            <Layout className='z-100'>
                <DashboardTopBar />
                <Content>
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