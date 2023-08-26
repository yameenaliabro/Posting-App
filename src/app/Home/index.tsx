import React from 'react'
import CreateBlog from '../section/homesection/createpost'
import { ShowPost } from '../section/homesection'
const MainHome = () => {
    return (
        <div>
            <CreateBlog />
            <ShowPost />
        </div>
    )
}
export default MainHome
