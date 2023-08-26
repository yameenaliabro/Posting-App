"use client";
import { Layout } from 'antd'
import React, { ReactNode } from 'react'
import { MainTopBar } from './components'

const { Content } = Layout

type MainLayoutProps = {
    children: ReactNode
}

function MainLayout(props: MainLayoutProps) {
    const { children } = props

    return (
        <Layout className='h-full'>
            <MainTopBar />
            <Content>
                {children}
            </Content>
        </Layout>
    )
}

export default MainLayout