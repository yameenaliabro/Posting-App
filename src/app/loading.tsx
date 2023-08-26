import React from 'react'
import { Spin } from "antd"
const loading = () => {
    return (
        <div className='flex justify-center items-center  h-full'>
            <Spin className='text-green-400' />
        </div>
    )
}
export default loading
