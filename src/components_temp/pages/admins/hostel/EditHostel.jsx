/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { hostelService } from "../../../../services/apiService";
import { BackButton, Button } from "../../../index"


const EditHostel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    blocks: "",
    floors_per_block: "",
    rooms_per_floor: ""
  });
  // 🔹 Normalize hostel state → form
  const mapHostelToForm = (hostel) => {
    setForm({
      name: hostel?.name || "",
      blocks: hostel?.blocks?.join(", ") || "",
      floors_per_block: hostel?.floors_per_block || "",
      rooms_per_floor: hostel?.rooms_per_floor || ""
    });
  };

  // 🔹 Fetch hostel by ID
  const fetchHostel = async () => {
    try {
      if (state) {
        mapHostelToForm(state);
        return;
      };

      const res = await hostelService.getById(id);
      mapHostelToForm(res.data.data)

    } catch (err) {
      console.error("Failed to fetch hostel", err);
      alert("Unable to load hostel details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostel();
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Update hostel
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      blocks: form.blocks
        .split(",")
        .map(b => b.trim().toLowerCase()),
      floors_per_block: Number(form.floors_per_block),
      rooms_per_floor: Number(form.rooms_per_floor)
    };

    try {
      await hostelService.update(id, payload);
      navigate("/admin/hostel");
    } catch (err) {
      console.error("Failed to update hostel", err);
      alert("Failed to update hostel");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading hostel...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-xl shadow max-w-2xl"
        >
          <h2 className="text-xl font-bold mb-6">Edit Hostel</h2>

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
                name="floors_per_block"
                type="number"
                value={form.floors_per_block}
                onChange={handleChange}
                className="sm:col-span-2 w-full border p-2 rounded"
                required
              />
            </div>

            {/* Rooms per floor */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Rooms / Floor
              </label>
              <input
                name="rooms_per_floor"
                type="number"
                value={form.rooms_per_floor}
                onChange={handleChange}
                className="sm:col-span-2 w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            {/* <button
              type="submit"
              disabled={saving}
              className="bg-black text-white px-5 py-2 rounded disabled:opacity-60"
            >
              {saving ? "Saving..." : "Update Hostel"}
            </button> */}
            <Button type="submit" className="px-4 cursor-pointer" disabled={saving} >
              {saving ? "Saving..." : "Update Hostel"}
            </Button>

            <Button
              children={"Cancel"}
              variant="text"
              onClick={() => navigate(-1)}
              className="border px-5 py-2 rounded"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHostel;
