"use client";
import { AuthContext, AuthContextProvider } from '@src/app/context/AuthContext'
import { useContext } from "react"

const UseAuth = () => {
    const value = useContext(AuthContext)
    console.log("🚀 ~ file: UseAuth.ts:7 ~ UseAuth ~ value:", value)
    if (!value) {
        throw new Error("useAuth can only be used in AuthProvider!")
    }
    return value
}
export default UseAuth