import { useState } from "react";
import { hostelService } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHostel } from "../../utils/store/hostelSlice";
import { BackButton } from "../index"

const HostelForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    code: "",
    blocks: "",
    floors_per_block: "",
    rooms_per_floor: "",
    total_rooms: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      blocks: form.blocks.split(",").map(b => b.trim())
    };

    const res = await hostelService.create(payload);
    if (res.data.success) {
      dispatch(setHostel(res.data.data))
      navigate("/admin/hostel");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
    {/* <div className="flex justify-center pt-16 bg-gray-100 min-h-screen"> */}
      <BackButton />

      <div className="flex justify-center">
        <form
          onSubmit={submit}
          className="p-6 bg-white rounded-xl shadow max-w-2xl w-full"
        >
          <h2 className="text-xl font-bold mb-6">Create Hostel</h2>

          <div className="space-y-4">
            {/* Hostel Name */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Hostel Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="sm:col-span-2 w-full border p-2 rounded"
                required
              />
            </div>

            {/* Hostel Code */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Hostel Code
              </label>
              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                className="sm:col-span-2 w-full border p-2 rounded"
                required
              />
            </div>

            {/* Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Blocks
              </label>
              <input
                name="blocks"
                placeholder="A, B, C"
                value={form.blocks}
                onChange={handleChange}
                className="sm:col-span-2 w-full border p-2 rounded"
                required
              />
            </div>

            {/* Floors per block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Floors / Block
              </label>
              <input
                type="number"
                name="floors_per_block"
                value={form.floors_per_block}
                onChange={handleChange}
                className="sm:col-span-2 w-full border p-2 rounded"
                min={1}
                required
              />
            </div>

            {/* Rooms per floor */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Rooms / Floor
              </label>
              <input
                type="number"
                name="rooms_per_floor"
                value={form.rooms_per_floor}
                onChange={handleChange}
                className="sm:col-span-2 w-full border p-2 rounded"
                min={1}
                required
              />
            </div>

            {/* Total Rooms (optional / derived) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Total Rooms
              </label>
              <input
                type="number"
                name="total_rooms"
                value={form.total_rooms}
                onChange={handleChange}
                className="sm:col-span-2 w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded"
            >
              Create Hostel
            </button>

            <button
              type="submit"
              onClick={() => navigate(-1)}
              className="border px-5 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default HostelForm;
