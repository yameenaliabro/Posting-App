"use client";
import { AuthContext, signin, signup } from '@src/app/types/auth'
import React, { useCallback, useState, useEffect, useMemo, createContext, ReactNode } from 'react'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
    User
} from "firebase/auth"
import { auth } from '@src/app/service/firebase'

const AuthContext = createContext<AuthContext | null>(null)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setloading] = useState<boolean>(false)
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [user, setuser] = useState<User | null>(null)
    const [token, settoken] = useState<string | null>(null)
    const signup = useCallback(async ({ email, firstname, password, image }: signup) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(user, {
                displayName: firstname,
                photoURL: image
            })
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:22 ~ signup ~ error:", error)
        }
    }, [])

    const signin = useCallback(async ({ email, password }: signin) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:30 ~ singin ~ error:", error)
        }
    }, [])

    const signout = useCallback(async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:39 ~ signout ~ error:", error)
        }
    }, [])

    const checkAuth = useCallback(() => {
        onAuthStateChanged(auth, async (_user) => {
            setloading(true)
            setuser(_user)
            setisAuthenticated(!!_user)
            if (_user) {
                const token = await user?.getIdToken()
                if (token) {
                }
                settoken(token!)
            }
            else {
                settoken(null)
            }
            setloading(false)
        })
    }, [user])
    useEffect(() => {
        checkAuth()
        return () => { }
    }, [checkAuth])

    const value = useMemo(() => ({
        signout,
        signup,
        signin,
        isAuthenticated,
        user
    }), [
        signout,
        signup,
        signin,
        isAuthenticated,
        user
    ])

    return (
        <div>
            <AuthContext.Provider value={value}>
                {loading ? <h1>loading</h1> : children}
            </AuthContext.Provider>
        </div>
    )
}

export { AuthContextProvider, AuthContext }