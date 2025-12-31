import React from 'react'
import { useParams } from 'react-router-dom'
import CreateRoom from "../../../../forms/CreateRoom"
const EditRoom = () => {
    const { id } = useParams();
    console.log("edit rooms ")
    console.log(id)
    return (
        <div>
            <CreateRoom roomId={id} />
        </div>
    )
}

export default EditRoom
