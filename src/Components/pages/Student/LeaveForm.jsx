import { useState } from "react";

// const LeaveForm = ({ student }) => {
const LeaveForm = () => {
  const [form, setForm] = useState({
    leave_type: "",
    from_date: "",
    to_date: "",
    reason: "",
    half_day: false,
    only_tomorrow: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-4xl">
      {/* Header */}
      <h2 className="text-xl font-bold mb-6">Apply Leave</h2>

      {/* Leave Type + Approver */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Leave Type
          </label>
          <select
            name="leave_type"
            value={form.leave_type}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Leave Type</option>
            <option value="casual">Casual Leave</option>
            <option value="medical">Medical Leave</option>
            <option value="emergency">Emergency Leave</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Approver
          </label>
          <input
            type="text"
            disabled
            value="Warden / Admin"
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6 mb-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="only_tomorrow"
            checked={form.only_tomorrow}
            onChange={handleChange}
            className="accent-indigo-600"
          />
          Only for tomorrow
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="half_day"
            checked={form.half_day}
            onChange={handleChange}
            className="accent-indigo-600"
          />
          Half day
        </label>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            From Date
          </label>
          <input
            type="date"
            name="from_date"
            value={form.from_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            To Date
          </label>
          <input
            type="date"
            name="to_date"
            value={form.to_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Reason */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Reason for Leave
        </label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Explain your reason briefly..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
          Cancel
        </button>
        <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          Apply Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveForm;
