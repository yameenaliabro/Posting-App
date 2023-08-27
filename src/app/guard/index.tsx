"use client";
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import UseAuth from '../hooks/auth/UseAuth';
import SignupPage from '../auth/signup/page';
import SigninPage from '../auth/signin/page';

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = UseAuth();
    const currentPathname = usePathname();

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

    // If user is authenticated and not on /auth/signin, render children
    if (isAuthenticated === true && currentPathname !== '/auth/signin') {
        return (
            <div>
                {children}
            </div>
        );
    }

    // Default case (not authenticated, not on /auth/signin)
    return null
};

export default AuthGuard;
