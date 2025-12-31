import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BackButton } from "../index"
import { roomService, studentService } from "../../services/apiService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectStudentById } from "../../utils/store/studentSlice";
import { selectRoomById } from "../../utils/store/roomsSlice";

const CreateStudent = ({ studentId }) => {
    const isEdit = Boolean(studentId);
    const navigate = useNavigate()
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",

        sid: "",
        branch: "",
        permanent_address: "",
        guardian_name: "",
        guardian_contact: "",

        block: "",
        room_number: "",
        capacity: "1",
        floor: "",
        yearly_rent: 7500,
    });
    const { state } = useLocation()
    const room = state?.room;
    const [searchParams] = useSearchParams()
    const roomId = searchParams.get("roomId")
    const roomByStore = useSelector(selectRoomById(roomId))


    useEffect(() => {
        if (isEdit) return;
        const fetchRoomById = async (id) => {
            try {
                const res = await roomService.getRoomById(id)
                const room = res.data.room
                setForm(prev => ({
                    ...prev,
                    block: room.block,
                    room_number: room.room_number,
                    capacity: room.capacity,
                }));
            } catch (err) {
                console.log(err, "fetching error roomId")
            }
        }
        if (state?.room) {
            setForm(prev => ({
                ...prev,
                block: state.room.block,
                room_number: state.room.room_number,
                capacity: state.room.capacity,
            }));
            return;
        }
        if (roomByStore) {
            setForm(prev => ({
                ...prev,
                block: roomByStore.block,
                room_number: roomByStore.room_number,
                capacity: roomByStore.capacity
            }));
            return;
        }
        if (roomId) {
            fetchRoomById(roomId);
        }
    }, [isEdit, room, roomByStore, roomId]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const studentFromStore = useSelector(selectStudentById(studentId))
    console.log(studentFromStore)

    useEffect(() => {
        if (!isEdit) return;
        if (studentFromStore) {
            setForm({
                full_name: studentFromStore.full_name || "",
                email: studentFromStore.email || "",
                phone: studentFromStore.phone || "",
                sid: studentFromStore.sid || "",
                branch: studentFromStore.branch || "",
                permanent_address: studentFromStore.permanent_address || "",
                guardian_name: studentFromStore.guardian_name || "",
                guardian_contact: studentFromStore.guardian_contact || "",
                block: studentFromStore.block || "",
                room_number: studentFromStore.room_number || "",
                capacity: studentFromStore.capacity || "",
            });
            return;
        }
        const fetchStudent = async () => {
            try {
                const res = await studentService.getStudentById(studentId);
                console.log(res, "successfully called insdier")
                const student = res.data.student;
                setForm({
                    full_name: student.full_name || "",
                    email: student.email || "",
                    phone: student.phone || "",

                    sid: student.sid || "",
                    branch: student.branch || "",
                    permanent_address: student.permanent_address || "",
                    guardian_name: student.guardian_name || "",
                    guardian_contact: student.guardian_contact || "",
                    block: student.block || "",
                    room_number: student.room_number || "",
                    capacity: student.capacity || "",
                })

            } catch (error) {
                console.log("Failed to load student", error);
            }
        }
        fetchStudent()

    }, [isEdit, studentId, studentFromStore])
    useEffect(() => {
        if (form.room_number) {
            setForm(prev => ({
                ...prev,
                floor: Math.floor(Number(form.room_number) / 100),
            }));
        } else {
            setForm(prev => ({
                ...prev,
                floor: "",
            }));
        }
    }, [form.room_number]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isEdit) {
                const { password, ...updatedPayload } = form;
                await studentService.updateStudent(studentId, updatedPayload);
                toast.success("Student Updated Successfully")
            }
            else {
                const payload = {
                    full_name: form.full_name,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                    role: "student",

                    sid: form.sid,
                    branch: form.branch,
                    permanent_address: form.permanent_address,
                    guardian_name: form.guardian_name,
                    guardian_contact: form.guardian_contact,
                    block: form.block,
                    room_number: Number(form.room_number),
                    capacity: Number(form.capacity),
                    floor: form.floor,
                    yearly_rent: Number(form.yearly_rent)
                };
                const res = await studentService.createUserStudent(payload)
                console.log(payload);
                console.log(res);
                if (!res.data?.success) {
                    throw new Error(res.data?.message || "Student creation failed");
                }
                alert("Student created successfully");
            }
            setForm({
                full_name: "",
                email: "",
                phone: "",
                password: "",
                sid: "",
                branch: "",
                permanent_address: "",
                guardian_name: "",
                guardian_contact: "",
                block: "",
                room_number: "",
                capacity: "",
                yearly_rent: "",
                floor: ""
            });
            navigate('/admin/students')
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong");
            toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
            {/* Back button */}
            <BackButton />
            <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit Student" : "Create Student"}</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className={`space-y-6 ${loading ? "opacity-70 pointer-events-none" : ""}`}>

                {/* ACCOUNT DETAILS */}
                <section>
                    <h2 className="font-semibold text-lg mb-3">Account Details</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <input name="full_name" placeholder="Full Name" required onChange={handleChange} value={form.full_name} className="input" />

                        <input name="email" type="email" placeholder="Email" required onChange={handleChange} value={form.email} className="input" autoComplete="email" />

                        <input name="phone" placeholder="Phone" required onChange={handleChange} value={form.phone} className="input" />

                        {!isEdit && (<input name="password" type="password" placeholder="Temporary Password" required onChange={handleChange} value={form.password} className="input" autoComplete="new-password" />)}

                    </div>
                </section>

                {/* STUDENT INFO */}
                <section>
                    <h2 className="font-semibold text-lg mb-3">Student Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input name="sid" placeholder="Student ID" required onChange={handleChange} value={form.sid} className="input" />

                        <input name="branch" placeholder="Branch" required onChange={handleChange} value={form.branch} className="input" />

                        <input name="guardian_name" placeholder="Guardian Name" onChange={handleChange} value={form.guardian_name} className="input" />

                        <input name="guardian_contact" placeholder="Guardian Contact" required onChange={handleChange} value={form.guardian_contact} className="input" />

                    </div>

                    <textarea
                        name="permanent_address"
                        placeholder="Permanent Address"
                        required
                        onChange={handleChange}
                        value={form.permanent_address}
                        className="input mt-4 w-full"
                        rows={3}
                    />
                </section>

                {/* ROOM ASSIGNMENT */}
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
                            placeholder="floor"
                            type="number"
                            onChange={handleChange}
                            value={form.floor}
                            className="input"
                        />
                        <input
                            name="yearly_rent"
                            placeholder="Yearly-Rent"
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
                        : isEdit ? "Update Student" : "Create Student"}
                </button>
            </form>
        </div>
    );
};

export default CreateStudent;
