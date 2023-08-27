import { User } from "firebase/auth"

export type signup = {
    firstname: string,
    lastname?: string,
    email: string,
    password: string,
    image: string
    repeatpassword: string
}

export type signin = {
    email: string,
    password: string,

}
export type updateProfie = {
    photoUrl: string,
    displayName: string
}

export type AuthContext = {
    signin: (props: signin) => void,
    signup: (props: signup) => void,
    signout: VoidFunction,
    isAuthenticated: boolean,
    user: User | null,
    updateProfileInfo: (props: updateProfie) => void,
    signupWithGoogle: () => void,
    loading: boolean

}