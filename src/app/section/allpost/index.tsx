"use client";
import { getpostprop } from "@src/app/types";
import { Avatar, Button, Card, Divider, List, Popconfirm, Typography, message } from "antd"
import { useCallback, useEffect, useState } from "react"
import { Timestamp } from "firebase/firestore";
import { UpdateModal } from "../homesection";
import { UseAuth, UsePost } from "@src/app/hooks";

const AllPost = () => {
    const [editmodalvisible, seteditmodalvisible] = useState(false)
    const [editPost, seteditPost] = useState<getpostprop | null>(null)
    const { deletePost, updatePost, Post } = UsePost()
    const { user } = UseAuth()
    useEffect(() => {
        return () => { }
    }, [Post])

    const handlEdit = useCallback((post: getpostprop) => {
        seteditPost(post)
        seteditmodalvisible(true)
    }, [])

    const handleUpdatePost = useCallback(async (postId: string, value: getpostprop) => {
        try {
            await updatePost(postId, value)
            message.success("post edit sucessfully")
            seteditmodalvisible(false)
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:28 ~ handleUpdatePost ~ error:", error)

        }
    }, [updatePost])

    const handledelete = useCallback(async (id: string) => {
        try {
            await deletePost(id)
            message.success("post deleted")
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:20 ~ handledelete ~ error:", error)
        }
    }, [deletePost])

    const onCancel = useCallback(() => {
        seteditmodalvisible(false)
    }, [])

    return (
        <div>
            <Typography.Title className="text-center mb-10">All  Post</Typography.Title>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 ml-10 mr-10">
                {Post.map(post => (
                    <Card
                        className="rounded-md max-h-[600px] min-h-[200px] overflow-y-auto"
                        key={post.id}
                        hoverable
                    >
                        <Card.Meta
                            avatar={<Avatar src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" />}
                            title={user?.displayName}
                            description={post.title}
                        />
                        <Divider />
                        <span className="text-center">{post.description}</span><br />
                        <span>CreatedAt: {post.createdAt instanceof Timestamp ? post.createdAt.toDate().toLocaleString() : 'Invalid Date'}</span>
                        <Divider />
                        <Popconfirm
                            title="are you sure you want to delete the post!"
                            okText="ok"
                            cancelText="cancel"
                            onConfirm={() => handledelete(post.id || "")}
                        >
                            <Button type="link" >Delete</Button>
                        </Popconfirm>
                        <Button type="link" onClick={() => handlEdit(post)}>Edit</Button>
                    </Card>
                ))}
            </div>
            <UpdateModal
                onCancel={onCancel}
                onSave={handleUpdatePost}
                post={editPost}
                visible={editmodalvisible}
            />
        </div>
    )
}
export default AllPost
