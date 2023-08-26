"use client";
import React from 'react'
import { Spin } from "antd"
const loader = () => {
    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <Spin className='text-green-400' />
        </div>
    )
}
export default loader
