import { useCallback, useEffect } from "react";
import { hostelService } from "../../../../services/apiService";
import { useNavigate } from "react-router-dom";
import { BackButton, Button } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { clearHostel, selectAllHostelState, setError, setHostel, setLoading } from "../../../../utils/store/hostelSlice";
import { useAllotment } from "../../../../customHooks/useAllotment";

const HostelOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector(selectAllHostelState);
  // console.log(data)
  const { allotment, error, allotmentLoading, toggleAllotment } = useAllotment(data?._id)

  const fetchHostel = useCallback(async () => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))
      const res = await hostelService.getAll();
      const hostelData = res?.data?.data?.[0] || null;
      dispatch(setHostel(hostelData));
    } catch (err) {
      console.error("Failed to load hostel", err);
      dispatch(clearHostel())
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch]);

  const handleDelete = async () => {
    const res = await hostelService.delete(data._id)
    dispatch(clearHostel());
  }

  useEffect(() => {
    if (loading) {
      fetchHostel();
    }
  }, [fetchHostel, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading hostel...
      </div>
    );
  }

  if (!data) {
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
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-sm text-gray-500">
              Hostel Code: {data.code}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${data.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
              }`}
          >
            {data.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Blocks</p>
            <p className="font-medium">
              {data.blocks.map(b => b.toUpperCase()).join(", ")}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Floor Per room</p>
            <p className="font-medium">
              {data.floors_per_block}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Room per Floor</p>
            <p className="font-medium">
              {data.rooms_per_floor}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Rooms</p>
            <p className="font-medium">
              {data.total_rooms}
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
          <div>
            <p className="text-gray-500">Allotment</p>
            <p className="font-medium">
              {allotment === "CLOSED" && "Allotment Closed"}
              {allotment === "PHASE_A" && "Phase A Allotment Running"}
              {allotment === "PHASE_B" && "Phase B Allotment Running"}
            </p>
          </div>
          {error && (
            <p className="text-sm text-red-600 mt-3">{error}</p>
          )}
        </div>

        <div className="flex gap-3 mt-8">

          <Button
            children={"Edit Hostel"}
            onClick={() => navigate(`/admin/hostel/${data?._id}/edit`, { state: data })} className="px-5 py-2 bg-blue-600 text-white rounded" />
          <Button
            children={"Delete Hostel"}
            variant="danger"
            onClick={handleDelete} className="px-5 py-2  text-white rounded" />
          {data?.is_active && <Button
            variant="primary"
            className="px-4"
            disabled={allotmentLoading}
            onClick={toggleAllotment}
          >
            {allotment === "CLOSED" && "Start Phase A"}
            {allotment === "PHASE_A" && "Move to Phase B"}
            {allotment === "PHASE_B" && "Close Allotment"}          </Button>}
        </div>

      </div>
    </div>
  );
};

export default HostelOverview;
