import { Loader } from '@src/app/compoenets/Common'
import { AuthContextProvider } from '@src/app/context'
import { DashboardLayout } from '@src/app/layouts'
import { ConfigProvider } from 'antd'
import React, { ReactNode, Suspense } from 'react'

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <ConfigProvider componentSize="large" >
                <AuthContextProvider>
                    <DashboardLayout>
                        <Suspense fallback={<Loader />}>
                            {children}
                        </Suspense>
                    </DashboardLayout>
                </AuthContextProvider>
            </ConfigProvider>
        </div>
    )
}

export default Provider