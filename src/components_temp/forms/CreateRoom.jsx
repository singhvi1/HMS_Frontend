import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackButton from '../common/ui/Backbutton';
import { roomService } from '../../services/apiService';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoomById, setRoom } from '../../utils/store/roomsSlice';

const CreateRoom = ({ roomId }) => {
    const isEdit = Boolean(roomId);
    const roomFromStore = useSelector(selectRoomById(roomId))

    const [form, setForm] = useState({
        block: "",
        room_number: "",
        capacity: "1",
        yearly_rent: 75500,

    });
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    useEffect(() => {
        if (!isEdit) return;
        if (roomFromStore) {
            setForm({
                block: roomFromStore?.block || "",
                room_number: roomFromStore?.room_number || "",
                capacity: roomFromStore?.capacity || "",
                yearly_rent: roomFromStore?.yearly_rent || "",
            });
            return;
        }
        const fetchStudent = async () => {
            try {
                const res = await roomService.getRoomById(roomId);
                const room = res.data.data;
                setForm({
                    block: room.block || "",
                    room_number: room.room_number || "",
                    capacity: room.capacity || "",
                })

            } catch (error) {
                console.log("Failed to load student", error);
            }
        }
        if (!roomFromStore) {
            fetchStudent()
        }

    }, [isEdit, roomId, roomFromStore])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const payload = {
                room_number: Number(form.room_number),
                block: form.block,
                capacity: Number(form.capacity),
                yearly_rent: Number(form.yearly_rent),
            }
            let res;
            if (isEdit) {
                res = await roomService.updateRoom(roomId, payload);
                toast.success("Room Updated SuccessFully")
            } else {
                res = await roomService.createRoom(payload);
                toast.success("Room Created SccessfullY")
            }

            const room = res.data.data
            dispatch(setRoom(res.data.data));
            toast.success("Room created Successfully")
            navigate(`/admin/rooms/${room._id}`)
        } catch (error) {
            console.log("Dont able to crate/Update Room", error)
        } finally { setLoading(false) }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }
    return (
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
            <BackButton />
            <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit Room" : "Create Room"}</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className={`space-y-6 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                <section>
                    <h2 className="font-semibold text-lg mb-3">Room Assignment</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select name="block" onChange={handleChange} value={form.block} className="input">
                            <option value="">Select Block</option>
                            <option value="a">Block A</option>
                            <option value="b">Block B</option>
                            <option value="c">Block C</option>
                        </select>
                        <select name="capacity" onChange={handleChange} value={form.capacity} className="input">
                            <option value="1">Single</option>
                            <option value="2">Double</option>
                            <option value="3">Triple</option>
                        </select>

                        <input
                            name="room_number"
                            placeholder="Room Number"
                            type="number"
                            onChange={handleChange}
                            value={form?.room_number || ""}
                            className="input"
                        />
                        <input
                            name="yearly_rent"
                            placeholder="Yearly Rent"
                            type="number"
                            onChange={handleChange}
                            value={form?.yearly_rent || ""}
                            className="input"
                        />
                    </div>
                </section>

                <button
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
                >
                    {loading
                        ? isEdit ? "updating..." : " Creating..."
                        : isEdit ? "Update Room" : "Create Room"}
                </button>
            </form>
        </div>
    )
}

export default CreateRoom
