import { useNavigate, useParams } from 'react-router-dom'
import { selectRoomById } from '../../../../../utils/store/roomsSlice';
import { useSelector } from 'react-redux';
import RoomProfileHeader from './RoomProfileHeader';
import RoomStudentsList from './RoomStudentsList';
import { students } from '../../../../../../data';
import AdminActionsPanel from '../../../../common/AdminActionsPanel';
import { getRoomActions } from '../../../../common/config.AdminAction';

const AdminRoomProfile = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const room = useSelector(selectRoomById(id));
    console.log(room)
    if (!room) {
        return (
            <div className="p-6 text-3xl min-h-screen flex justify-center text-center">
                Room not found
            </div>
        );
    }
    const roomStudent = students.filter((s) => s?.room_number === room?.room_number)
    const actions = room ? getRoomActions({ room, navigate }) : []
    console.log(actions)

    return (
        <div className="space-y-6">
            <RoomProfileHeader room={room} students={roomStudent} />

            <AdminActionsPanel title="Room Actions" actions={actions} />
            <RoomStudentsList students={roomStudent} />
            {/* Future sections */}
            <div className="my-6 bg-white p-2">
                <h1 className='text-3xl text-center'>Maintaince History</h1>
                <h3>1.Mataince History</h3>
                <h3>2.Mataince History</h3>
                <h3>3.Mataince History</h3>
            </div>
        </div>
    )
}

export default AdminRoomProfile
