import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackButton, Button } from "../index"
import { allotmentService, roomService, studentService } from "../../services/apiService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectStudentByUserId, setStudent, } from "../../utils/store/studentSlice";
import { setStudent as setStudentProfile } from "../../utils/store/studentProfile"
import { selectRoomById } from "../../utils/store/roomsSlice";
import { mapFormToAllotmentPayload, mapFormToCreateStudentPayload, mapRoomToForm, mapStudentToForm } from "../../../data";
import { initialForm } from "../../../data";
import { selectAllotedRoomById } from "../../utils/store/allotmentRoom";
import { setLoggedinUser } from "../../utils/store/logedinUser";
import { Imp } from "../common/ui/Helper";



const CreateStudent = ({ studentId }) => {
    const isEdit = Boolean(studentId);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const roomId = searchParams.get("roomId")
    const isAllotmentA = location.pathname.includes("phase-a");
    const isAllotmentB = location.pathname.includes("phase-b");
    const roomByStore = useSelector(selectRoomById(roomId))
    const allotedRoomByStore = useSelector(selectAllotedRoomById(roomId))
    // console.log(allotedRoomByStore)

    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const studentFromStore = useSelector(selectStudentByUserId(studentId))



    //editing a  studnet
    useEffect(() => {
        if (!isEdit) return;
        if (studentFromStore) {
            setForm(prev => ({
                ...prev, ...mapStudentToForm(studentFromStore)
            }));
            return;
        }
        const fetchStudent = async () => {
            try {
                const res = await studentService.getStudentById(studentId);
                const student = res.data.student;
                setForm(prev => ({
                    ...prev, ...mapStudentToForm(student)
                }));
            } catch (error) {
                console.log("Failed to load student", error);
            }
        }
        fetchStudent()

    }, [isEdit, studentId, studentFromStore])

    //fetching room by id in room if admin want to add student 
    useEffect(() => {
        if (isEdit || !roomId || isAllotmentA) return;
        const fetchRoomById = async (id) => {
            try {
                const res = await roomService.getRoomById(id)
                const room = res.data.room
                setForm(prev => ({
                    ...prev, ...mapRoomToForm(room)
                }));
            } catch (err) {
                console.log(err, "fetching error roomId")
            }
        }

        if (roomByStore) {
            setForm(prev => ({
                ...prev, ...mapRoomToForm(roomByStore)
            }));
            return;
        }
        if (roomId) {
            fetchRoomById(roomId);
        }
    }, [isAllotmentA, isEdit, roomByStore, roomId]);


    //during allotment room detail filling 
    useEffect(() => {
        if (!isAllotmentA || !roomId) return;
        if (allotedRoomByStore) {
            setForm(prev => ({
                ...prev, ...mapRoomToForm(allotedRoomByStore)
            }));
            return;
        }
        const fetchAllotedRoomById = async (roomId) => {
            try {
                const res = await allotmentService.getRoomById(roomId)
                const room = res.data.room
                setForm(prev => ({
                    ...prev, ...mapRoomToForm(room)
                }));
            } catch (err) {
                console.log(err, "fetching error roomId for allotment")
            }
        }

        if (roomId) {
            fetchAllotedRoomById(roomId);
        }
    }, [allotedRoomByStore, isAllotmentA, roomId])



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAllotmentB && (!form.block || !form.room_number)) {
            toast.error("Room assignment is required");
            setLoading(false);
            return;
        }

        setError("");
        setLoading(true);

        try {
            if (isEdit) {
                const { _password, ...updatedPayload } = form;
                const res = await studentService.updateStudent(studentId, updatedPayload);
                dispatch(setStudent(res.data.student))
                toast.success("Student Updated Successfully")
                navigate(`/admin/students/${res.data.student.user_id._id}`, { replace: true });

            } else if (isAllotmentA) {
                const payload = {
                    ...mapFormToAllotmentPayload(form),
                    ...(roomId ? { room_id: roomId } : { room_number: form.room_number, block: form.block }),
                }
                const res = await allotmentService.addUserStudent(payload);
                if (!res.data?.success) {
                    throw new Error(res.data?.message || "Student creation failed in phase a");
                }
                // dispatch(setLoggedinUser())
                dispatch(setLoggedinUser(res.data.data?.student?.user_id
                ));
                dispatch(setStudentProfile(res.data.data?.student));
                navigate(`/student`, { replace: true })

            } else if (isAllotmentB) {
                const payload = {
                    ...mapFormToAllotmentPayload(form),
                }
                const res = await allotmentService.addUserStudentB(payload);
                if (!res.data?.success) {
                    throw new Error(res.data?.message || "Student creation failed in phase b");
                }
                dispatch(setLoggedinUser(res.data.data.populatedStudent?.user_id));
                dispatch(setStudentProfile(res.data.data.populatedStudent));
                navigate(`/student`, { replace: true })

            }
            else {
                const payload = {
                    ...mapFormToCreateStudentPayload(form),
                    ...(roomId && { roomId })
                }
                const res = await studentService.createUserStudent(payload)
                if (!res.data?.success) {
                    throw new Error(res.data?.message || "Student creation failed");
                }
                dispatch(setStudent(res.data.data.student));
                toast.success("Student created successfully");
                navigate(`/admin/students/${res.data.data.student.user_id._id}`, { replace: true });
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong");
            toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const val = type === "file" ? files[0] : value;
        // setForm(prev => ({ ...prev, [name]: value }));

        if (name.includes(".")) {
            const [parent, child, grandChild] = name.split(".");

            setForm(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: {
                        ...prev[parent]?.[child],
                        [grandChild]: val
                    }
                }
            }));

        } else {
            // Normal flat update
            setForm(prev => ({ ...prev, [name]: val }));
        }
    };


    return (
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
            <BackButton />
            <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit Student" : "Create Student"}</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className={`space-y-6 ${loading ? "opacity-70 pointer-events-none" : ""}`}>

                <section>
                    <h2 className="font-semibold text-lg mb-3">Account Details <Imp /> </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <input name="full_name" placeholder="Full Name" required onChange={handleChange} value={form.full_name} className="input" />

                        <input name="email" type="email" placeholder="Email" required onChange={handleChange} value={form.email} className="input" autoComplete="email" />

                        <input name="phone" placeholder="Phone" required onChange={handleChange} value={form.phone} className="input" />

                        {!isEdit && (<input name="password" type="password" placeholder="Temporary Password" required onChange={handleChange} value={form.password} className="input" autoComplete="new-password" />)}

                    </div>
                </section>
                <section>
                    <h2 className="font-semibold text-lg mb-3">Profile Picture <Imp /></h2>
                    <input
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 hover:file:bg-blue-100"
                    />
                </section>
                <section>
                    <h2 className="font-semibold text-lg mb-3">Student Information <Imp /></h2>
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

                <div className="space-y-6">
                    <section>
                        <h1 className="font-semibold text-lg mb-3">Identity Verification <Imp /></h1>

                        <h3 className="text-sm font-medium text-gray-700 mb-2">Student Identity</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <select
                                name="verificationIds.studentId.idType"
                                value={form.verificationIds?.studentId?.idType || ""}
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="" disabled>Select ID Type</option>
                                <option value="AADHAAR">Addhar Number</option>
                                <option value="PAN">Pan Number</option>
                                <option value="VOTER_ID">Voter ID</option>
                                <option value="PASSPORT">Passport</option>
                            </select>

                            <input
                                name="verificationIds.studentId.idValue"
                                value={form.verificationIds?.studentId?.idValue || ""}
                                placeholder="ID Number (e.g., Aadhaar/PAN)"
                                required
                                onChange={handleChange}
                                className="input"
                            />
                        </div>

                        <h3 className="text-sm font-medium text-gray-700 mb-2">Guardian Details </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <select
                                name="verificationIds.guardianId.idType"
                                value={form.verificationIds?.guardianId?.idType || ""}
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="x" disabled>Select Guardian ID Type</option>
                                <option value="AADHAAR">Addhar Number</option>
                                <option value="PAN">Pan Number</option>
                                <option value="VOTER_ID">Voter ID</option>
                                <option value="PASSPORT">Passport</option>

                            </select>

                            <input
                                name="verificationIds.guardianId.idValue"
                                placeholder="Guardian ID Number"
                                required
                                onChange={handleChange}
                                value={form.verificationIds?.guardianId?.idValue || ""}
                                className="input"
                            />
                        </div>
                    </section>

                    <section>
                        <h2 className="font-semibold text-lg mb-3 border-t pt-4 mt-4">Payment Verification <Imp /></h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <select
                                name="verificationIds.paymentId.idType"
                                value={form.verificationIds?.paymentId?.idType || ""}
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="" disabled>Select Payment Mode</option>
                                <option value="UPI">UPI</option>
                                <option value="BANK_TXN">Via Bank Transaction</option>
                                <option value="CHEQUE">Cheque</option>

                            </select>

                            <input
                                name="verificationIds.paymentId.idValue"
                                placeholder="Transaction ID / Cheque No."
                                required
                                onChange={handleChange}
                                value={form.verificationIds?.paymentId?.idValue || ""}
                                className="input"
                            />

                            {/* <input
                                name="verificationIds.paymentId.amount"
                                placeholder="Amount Paid"
                                type="number"
                                onChange={handleChange}
                                value={form.verificationIds?.paymentId?.amount || ""}
                                className="input"
                            /> */}
                        </div>
                    </section>
                </div>
                {!isAllotmentB && <section>
                    <h2 className="font-semibold text-lg mb-3">Room Assignment <Imp /></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select name="block" onChange={handleChange} value={form.block} className="input" required>
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
                            value={form.room_number}
                            className="input"
                            required
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
                </section>}

                <Button type="submit" disabled={loading} variant='success' className="px-6 py-2 ">
                    {loading
                        ? isEdit ? "updating..." : " Creating..."
                        : isEdit ? "Update Student" : "Create Student"}
                </Button>
            </form>
        </div>
    );
};

export default CreateStudent;
