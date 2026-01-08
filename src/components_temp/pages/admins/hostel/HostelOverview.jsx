/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { hostelService } from "../../../../services/apiService";
import { useNavigate } from "react-router-dom";
import { BackButton, Button } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { clearHostel, setHostel } from "../../../../utils/store/hostelSlice";

const HostelOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: hostel, loading } = useSelector((state) => state.hostel);

  const fetchHostel = async () => {
    try {
      const res = await hostelService.getAll();
      const hostelData = res?.data?.data?.[0] || null;
      dispatch(setHostel(hostelData));
    } catch (err) {
      console.error("Failed to load hostel", err);
      dispatch(clearHostel())
    }
  };

  const handleDelete=async ()=>{
    const res=await hostelService.delete(hostel._id)
    dispatch(clearHostel());
  }

  useEffect(() => {
    if (loading) {
      fetchHostel();
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading hostel...
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-16">
        <div className="p-6 bg-white rounded-xl shadow max-w-md w-full text-center">
          <h1 className="text-xl font-bold mb-3">Hostel Setup</h1>
          <p className="text-sm text-gray-500 mb-6">
            No hostel found. Create one to get started.
          </p>

          <Button children={"+ Create Hostel"}
            onClick={() => navigate("/admin/hostel/new")}
            className="inline-block bg-black text-white px-5 py-2 rounded" />

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-16">
      <div className="bg-white rounded-2xl shadow max-w-3xl w-full p-8">
        <BackButton />

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{hostel.name}</h1>
            <p className="text-sm text-gray-500">
              Hostel Code: {hostel.code}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${hostel.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
              }`}
          >
            {hostel.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Blocks</p>
            <p className="font-medium">
              {hostel.blocks.map(b => b.toUpperCase()).join(", ")}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Floor Per room</p>
            <p className="font-medium">
              {hostel.floors_per_block}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Room per Floor</p>
            <p className="font-medium">
              {hostel.rooms_per_floor}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Rooms</p>
            <p className="font-medium">
              {hostel.total_rooms}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Student</p>
            <p className="font-medium">
              xxxx
            </p>
          </div>
          <div>
            <p className="text-gray-500">Warden Names</p>
            <p className="font-medium">
              xxxx
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-8">

          <Button
            children={"Edit Hostel"}
            onClick={() => navigate(`/admin/hostel/${hostel._id}/edit`, { state: hostel })} className="px-5 py-2 bg-blue-600 text-white rounded" />
          <Button
            children={"Delete Hostel"}
            variant="danger"
            onClick={handleDelete} className="px-5 py-2  text-white rounded" />
        </div>

      </div>
    </div>
  );
};

export default HostelOverview;
