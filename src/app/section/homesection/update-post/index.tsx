import { getpostprop } from '@src/app/types'
import React from 'react'

interface editModalProps {
    visible: boolean,
    post: getpostprop | null,
    onSave: (editpost: getpostprop) => void
    onCancel: () => void
}

function ShowModal() {
    return (
        <div>ShowModal</div>
    )
}

export default ShowModal