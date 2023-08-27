"use client";
import { AuthContext, signin, signup, updateProfie } from '@src/app/types/auth'
import React, { useCallback, useState, useEffect, useMemo, createContext, ReactNode } from 'react'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
    User,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"
import { auth } from '@src/app/service/firebase'
import Loading from '@src/app/Loading/page';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<AuthContext | null>(null)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setloading] = useState<boolean>(true)
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [user, setuser] = useState<User | null>(null)
    const [token, settoken] = useState<string | null>(null)
    const { push } = useRouter()
    const signup = useCallback(async ({ email, firstname, password, image }: signup) => {
        setloading(true)
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(user, {
                displayName: firstname,
                photoURL: image
            })
            setloading(false)
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:22 ~ signup ~ error:", error)
            setloading(false)
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
                push("/")
            }
        } catch (error) {
            console.log('Error updating profile:', error);
            setloading(false)
        }
    }, [user, push]);

    const signin = useCallback(async ({ email, password }: signin) => {
        setloading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setloading(false)
            push("/")
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:30 ~ singin ~ error:", error)
            setloading(false)

        }
    }, [push])

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
    }, [user,])


    const signupWithGoogle = useCallback(async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user) {
                updateProfileInfo({
                    displayName: user.displayName as string,
                    photoUrl: user.photoURL as string,
                });
                push("/")
            }
        } catch (error) {
            console.error('Google signup error:', error);
        }
    }, [updateProfileInfo, push]);

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
        updateProfileInfo,
        signupWithGoogle,
        loading
    }), [
        signout,
        signup,
        signin,
        isAuthenticated,
        user,
        updateProfileInfo,
        signupWithGoogle,
        loading
    ])

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider, AuthContext }