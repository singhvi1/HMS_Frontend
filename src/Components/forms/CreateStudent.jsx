import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../index"

const CreateStudent = () => {
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
        room_number: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.post(
                "http://localhost:5000/api/warden/students",
                form,
                { withCredentials: true }
            );

            alert("Student created successfully");
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
                room_number: ""
            });
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
            {/* Back button */}
            <BackButton />
            <h1 className="text-2xl font-bold mb-6">Create Student</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* ACCOUNT DETAILS */}
                <section>
                    <h2 className="font-semibold text-lg mb-3">Account Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input name="full_name" placeholder="Full Name" required onChange={handleChange} value={form.full_name} className="input" />
                        <input name="email" type="email" placeholder="Email" required onChange={handleChange} value={form.email} className="input" />
                        <input name="phone" placeholder="Phone" required onChange={handleChange} value={form.phone} className="input" />
                        <input name="password" type="password" placeholder="Temporary Password" required onChange={handleChange} value={form.password} className="input" />
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
                    <h2 className="font-semibold text-lg mb-3">Room Assignment (Optional)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select name="block" onChange={handleChange} value={form.block} className="input">
                            <option value="">Select Block</option>
                            <option value="a">Block A</option>
                            <option value="b">Block B</option>
                            <option value="c">Block C</option>
                        </select>

                        <input
                            name="room_number"
                            placeholder="Room Number"
                            type="number"
                            onChange={handleChange}
                            value={form.room_number}
                            className="input"
                        />
                    </div>
                </section>

                <button
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create Student"}
                </button>
            </form>
        </div>
    );
};

export default CreateStudent;
