import { useParams } from 'react-router-dom'
import CreateStudent from '../../../../forms/CreateStudent'

const EditStudent = () => {
    const { id } = useParams()
    return (
        <div>
            <CreateStudent studentId={id} />
        </div>
    )
}

export default EditStudent
