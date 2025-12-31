import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackButton from '../common/ui/Backbutton';
import { roomService } from '../../services/apiService';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectRoomById } from '../../utils/store/roomsSlice';

const CreateRoom = ({ roomId }) => {
    const isEdit = Boolean(roomId);
    const roomFromStore = useSelector(selectRoomById(roomId))
    console.log(roomFromStore)
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        block: "",
        room_number: "",
        capacity: "1",
        floor: "",
        yearly_rent: 75500,

    });
    const navigate = useNavigate()
    const [error, setError] = useState("");
    useEffect(() => {
        if (form.room_number) {
            setForm(prev => ({
                ...prev,
                floor: Math.floor(Number(form.room_number) / 100)
            }))
        } else {
            setForm((prev) => ({
                ...prev,
                floor: "",
            }))
        }
    }, [form.room_number])

    useEffect(() => {
        if (!isEdit) return;
        if (roomFromStore) {
            setForm({
                block: roomFromStore.block || "",
                room_number: roomFromStore.room_number || "",
                capacity: roomFromStore.capacity || "",
            });
            return;
        }
        const fetchStudent = async () => {
            try {
                const res = await roomService.getStudentById(roomId);
                console.log(res, "successfully called insdier")
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
        fetchStudent()

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
                floor: form.floor,
                yearly_rent: Number(form.yearly_rent),
            }
            const res = await roomService.createRoom(payload)
            console.log(res.data.data);
            const room = res.data.data
            toast.success("Room created Successfully")
            navigate(`/admin/rooms/${room._id}`)
        } catch (error) {
            console.log("Dont able to crate/Update Room", error)
        } finally { setLoading(false) }
        console.log("handle submit", form)
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

            <form onSubmit={handleSubmit} className={`space-y-6 ${loading ? "opacity-70 pointer-events-none" : ""}`}>
                <section>
                    <h2 className="font-semibold text-lg mb-3">Room Assignment</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select name="block" onChange={handleChange} value={form.block} className="input">
                            <option value="">Select Block</option>
                            <option value="A">Block A</option>
                            <option value="B">Block B</option>
                            <option value="C">Block C</option>
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
                            value={form.room_number}
                            className="input"
                        />
                        <input
                            name="floor"
                            placeholder="Floor"
                            type="number"
                            onChange={handleChange}
                            value={form.floor}
                            className="input"
                        />
                        <input
                            name="yearly_rent"
                            placeholder="Yearly Rent"
                            type="number"
                            onChange={handleChange}
                            value={form.yearly_rent}
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
