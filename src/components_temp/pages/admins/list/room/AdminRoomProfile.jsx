/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom'
import { selectRoomById, setRoom } from '../../../../../utils/store/roomsSlice';
import { useDispatch, useSelector } from 'react-redux';
import RoomProfileHeader from './RoomProfileHeader';
import RoomStudentsList from './RoomStudentsList';
import { getRoomActions } from '../../../../common/config.AdminAction';
import QuickActionsGrid from "../../../../common/QuickActionGrid"
import { roomService } from '../../../../../services/apiService';
import { useEffect } from 'react';
import Button from '../../../../common/ui/Button';
import useRoomStateToggle from '../../../../../customHooks/useRoomStateToggle';




const AdminRoomProfile = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch()
    const { toggleRoomStatus } = useRoomStateToggle()
    const room = useSelector(selectRoomById(id));

    const fetchRoomById = async () => {
        try {
            const res = await roomService.getRoomById(id)
            dispatch(setRoom(res.data.data));
        } catch (error) {
            console.log("Not able to find room", error);
        }
    }
    useEffect(() => {
        if (!room) {
            fetchRoomById()
        }
    }, [id, room, dispatch])

    if (!room) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
                <div className="text-3xl font-semibold">
                    Room Loading... <span className="text-gray-500 text-lg block mt-2">(or Go to Home)</span>
                </div>
                <Button className='p-4' onClick={() => navigate('/')}>Home</Button>
            </div>
        );
    }


    const roomStudents = room?.occupants ?? [];
    return (
        <div className="space-y-6">
            <RoomProfileHeader room={room} />
            <QuickActionsGrid
                title="Room Actions"
                actions={getRoomActions({ room, toggleRoomStatus })}
            />


            <RoomStudentsList students={roomStudents} />
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
