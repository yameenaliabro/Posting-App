"use client";
import { UsePost } from "@src/app/hooks";
import { Avatar, Card, Divider, List, Typography } from "antd"
import { useEffect, useState } from "react"

const ShowPost = () => {
    const { Post } = UsePost()
    const [postCount, setPostCount] = useState(0);

    useEffect(() => {
        setPostCount(Post.length);
        return () => { }
    }, [Post])

    return (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 ml-10 mr-10">
            {Post.map((post: any) => (
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
                </Card>
            ))}
        </div>
    )
}
export default ShowPost
