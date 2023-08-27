"use client";
import { UseAuth } from '@src/app/hooks'
import { db } from '@src/app/service/firebase'
import { PostContext, createpostprop, getpostprop, } from '@src/app/types'
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
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

    const getAllPost = useCallback(async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'posts')); // Replace 'posts' with your collection name

            const postData: getpostprop[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title, // Replace with the actual field names in Firestore
                description: doc.data().description,
                userName: doc.data().userName,
                createdAt: doc.data().createdAt,
                userId: doc.data().userId,
            }));
            setPosts(postData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

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

    const updatePost = useCallback(async (postid: string, updaPost: getpostprop) => {
        setLoading(true)
        try {
            await updateDoc(doc(db, "blogs", postid), updaPost)
            setPosts(prev =>
                prev.map((post) => (post.id === postid ? { ...post, ...updaPost } : post))
            )
            setLoading(false)
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:68 ~ updaPost ~ error:", error)
        }
    }, [])
    useEffect(() => {
        getPost()
        return () => { }
    }, [getPost])


    const value = useMemo(() => ({
        createPost,
        getPost,
        Post,
        loading,
        deletePost,
        updatePost,
        getAllPost
    }), [
        createPost,
        getPost,
        Post,
        loading,
        deletePost,
        updatePost,
        getAllPost,
    ])
    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}

export { PostProvider, PostContext }