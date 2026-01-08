import React from 'react'
import { useParams } from 'react-router-dom'
import CreateRoom from "../../../../forms/CreateRoom"
const EditRoom = () => {
    const { id } = useParams();
    return (
        <div>
            <CreateRoom roomId={id} />
        </div>
    )
}

export default EditRoom
