"use client";
import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import UseAuth from '../hooks/auth/UseAuth';
import SignupPage from '../auth/signup/page';
import SigninPage from '../auth/signin/page';

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = UseAuth();
    const router = useRouter()
    const currentPathname = usePathname()

    if (currentPathname === '/auth/signin' && isAuthenticated === false) {
        return (
            <div>
                <SigninPage />
            </div>
        );
    }

    if (isAuthenticated === false) {
        return (
            <div>
                <SignupPage />
            </div>
        );
    }


    if (isAuthenticated === true) {
        router.replace("/")

        return (
            <div>
                {children}
            </div>
        );
    }


};

export default AuthGuard;
