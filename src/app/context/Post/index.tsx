"use client";
import { Loader } from '@src/app/compoenets/Common';
import { UseAuth } from '@src/app/hooks'
import { auth, db } from '@src/app/service/firebase'
import { PostContext, createpostprop, getpostprop, } from '@src/app/types'
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import React, { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react'


const PostContext = createContext<PostContext | null>(null)

const PostProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false)
    const [Post, setPosts] = useState<getpostprop[]>([])
    const { user } = UseAuth()

    const createPost = useCallback(async (prop: createpostprop) => {
        setLoading(true);
        try {
            const newPost = {
                title: prop.title,
                description: prop.description,
                createdAt: serverTimestamp(),
                userId: user?.uid,
                userName: user?.displayName || null
            };

            const docRef = await addDoc(collection(db, "blogs"), newPost);
            setPosts(prevPosts => [{ ...newPost, id: docRef.id }, ...prevPosts]);
        } catch (error) {
            console.log("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);


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
                setPosts(posts)
            }
        } catch (error) {

        }
    }, [user])

    const deletePost = useCallback(async (postId: string) => {
        try {
            await deleteDoc(doc(db, "blogs", postId))
            setPosts(Post.filter(post => post.id !== postId))
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:58 ~ deletePost ~ error:", error)
        }
    }, [Post])
    useEffect(() => {
        getPost()
        return () => { }
    }, [getPost])


    const value = useMemo(() => ({
        createPost,
        getPost,
        Post,
        loading,
        deletePost
    }), [
        createPost,
        getPost,
        Post,
        loading,
        deletePost
    ])
    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}

export { PostProvider, PostContext }