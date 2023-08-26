"use client";
import { UsePost } from "@src/app/hooks";
import { getpostprop } from "@src/app/types";
import { Avatar, Button, Card, Divider, List, Popconfirm, Typography, message } from "antd"
import { useCallback, useEffect, useState } from "react"

const ShowPost = () => {
    const { Post, deletePost } = UsePost()
    const [postCount, setPostCount] = useState(0);

    useEffect(() => {
        setPostCount(Post.length);
        return () => { }
    }, [Post])

    const handledelete = useCallback(async (id: string) => {
        try {
            await deletePost(id)
            message.success("post deleted")
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:20 ~ handledelete ~ error:", error)
        }
    }, [deletePost])

    const handleEdit = useCallback((post: getpostprop) => {
        try {

        } catch (error) {
            console.log("🚀 ~ file: index.tsx:28 ~ handleEdit ~ error:", error)
        }
    }, [])

    return (
        <div>
            <Typography.Title className="text-center mb-10">All Blogs</Typography.Title>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 ml-10 mr-10">
                {Post.map(post => (
                    <Card
                        className="rounded-md max-h-[600px] min-h-[200px] overflow-y-auto"
                        key={post.id}
                        hoverable
                        extra={<a href="#">View Details</a>}>
                        <Card.Meta
                            avatar={<Avatar src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" />}
                            title={post.userName}
                            description={post.title}
                        />
                        <Divider />
                        <span className="text-center">{post.description}</span>
                        <span>CreatedAt: {post.createdAt.toLocaleString()}</span>

                        <Divider />
                        <Popconfirm
                            title="are you sure you want to delete the post!"
                            okText="ok"
                            cancelText="cancel"
                            onConfirm={() => handledelete(post.id || "")}
                        >
                            <Button type="link" >Delete</Button>
                        </Popconfirm>
                        <Button type="link" onClick={() => handleEdit(post)}>Edit</Button>
                    </Card>
                ))}
            </div>
        </div>
    )
}
export default ShowPost
