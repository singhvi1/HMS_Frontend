import { lazy } from 'react';
import { useParams } from 'react-router-dom'
const CreateRoom =lazy(()=>import("../../../../forms/CreateRoom")) 
const EditRoom = () => {
    const { id } = useParams();
    return (
        <div>
            <CreateRoom roomId={id} />
        </div>
    )
}

export default EditRoom
