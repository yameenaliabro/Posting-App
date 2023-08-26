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
    userName: string,
    createAt: Date,
    id: string
}

export type PostContext = {
    createPost: (props: createpostprop) => void,
    getPost: () => void,
    Post: getpostprop[],
    loading: boolean
    // deletepost: (userid: string) => void
    // editpost: (props: getpostprop) => void
}
