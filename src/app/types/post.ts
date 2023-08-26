import { FieldValue } from "firebase/firestore"

export type createpostprop = {
    title: string,
    description: string,
    userId: string,
    createAt: Date,
    userName: string
}

export type getpostprop = {
    title: string,
    description: string,
    userName: string | null,
    createdAt: FieldValue,
    id: string | null
    userId?: string,
}

export type PostContext = {
    createPost: (props: createpostprop) => void,
    getPost: () => void,
    Post: getpostprop[],
    loading: boolean
    deletePost: (userid: string) => void
    updatePost: (postid: string, props: getpostprop) => void,
    getAllPost: () => void
}
