"use client";
import React, { ReactNode } from 'react'
import SigninPage from '../auth/signin/page'
import UseAuth from '../hooks/auth/UseAuth';
import SignupPage from '../auth/signup/page';

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = UseAuth()
    console.log("🚀 ~ file: index.tsx:8 ~ AuthGuard ~ isAuthenticated :", isAuthenticated)
    if (isAuthenticated === false) {
        return (
            <div>
                <SigninPage />
                <SignupPage />
            </div>
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthGuard