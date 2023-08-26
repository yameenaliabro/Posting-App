"use client";
import { AuthContext, signin, signup, updateProfie } from '@src/app/types/auth'
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
import Loading from '@src/app/Loading/page';

const AuthContext = createContext<AuthContext | null>(null)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setloading] = useState<boolean>(true)
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

    const updateProfileInfo = useCallback(async (value: updateProfie) => {
        const { displayName, photoUrl: photoURL } = value
        setloading(true)
        try {
            if (user) {
                await updateProfile(user, {
                    displayName,
                    photoURL,
                });
                setuser({ ...user, displayName, photoURL });
                setloading(false)
            }
        } catch (error) {
            console.log('Error updating profile:', error);
            setloading(false)
        }
    }, [user]);

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

    const checkAuth = useCallback(async () => {
        onAuthStateChanged(auth, async (_user) => {
            console.log()
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
        console.log(loading)
    }, [checkAuth, loading])
    const value = useMemo(() => ({
        signout,
        signup,
        signin,
        isAuthenticated,
        user,
        updateProfileInfo
    }), [
        signout,
        signup,
        signin,
        isAuthenticated,
        user,
        updateProfileInfo
    ])

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider, AuthContext }