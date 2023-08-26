"use client";
import { Loader } from '@src/app/compoenets/Common';
import { UseAuth } from '@src/app/hooks'
import { auth, db } from '@src/app/service/firebase'
import { PostContext, createpostprop, getpostprop, } from '@src/app/types'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import React, { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react'


const PostContext = createContext<PostContext | null>(null)

const PostProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setloading] = useState(false)
    const [Post, setPost] = useState<getpostprop[]>([])
    const { user } = UseAuth()

    const createPost = useCallback(async (prop: createpostprop) => {
        setloading(true)
        try {
            const doc = await addDoc(collection(db, "blogs"), {
                title: prop.title,
                description: prop.description,
                createdAt: serverTimestamp(),
                userId: user?.uid,
                userName: user?.displayName
            })
            setloading(false)
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:10 ~ onFinish ~ error:", error)
        } finally {
            setloading(false)
        }
    }, [user])


    const getPost = useCallback(async () => {
        try {
            if (user) {
                const userid = user.uid;
                const fetchquery = query(collection(db, "blogs"), where("userId", "==", userid))
                const querySnapshot = await getDocs(fetchquery)
                const posts: getpostprop[] = [];
                querySnapshot.forEach((doc) => {
                    posts.push({ ...doc.data(), id: doc.id } as getpostprop)
                })
                setPost(posts)
            }
        } catch (error) {

        }
    }, [user])

    useEffect(() => {
        getPost()
        return () => { }
    }, [getPost])


    const value = useMemo(() => ({
        createPost,
        getPost,
        Post,
        loading,
    }), [
        createPost,
        getPost,
        Post,
        loading
    ])
    return (
        <PostContext.Provider value={value}>
            {loading ? <Loader /> : children}
        </PostContext.Provider>
    )
}

export { PostProvider, PostContext }