"use client";
import { Layout } from "antd"
import { DashboardSideBar, DashboardTopBar } from './components'

const DashboardLayout = () => {
    const { Content } = Layout

    return (
        <Layout className='h-full'>
            <DashboardTopBar />
            <Layout className='w-full'>
                <DashboardSideBar />
                <Content className='overflow-y-auto'>
                </Content>
            </Layout>
        </Layout>
    )
}
export default DashboardLayout