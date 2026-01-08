import { useState, useEffect } from "react";
import BackButton from "../common/ui/Backbutton";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText, UserCheck, AlertCircle } from "lucide-react";
import { leaveForm } from "../../../data";
import Button from "../common/ui/Button";

const LeaveForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(leaveForm);


  
  useEffect(() => {
    if (form.only_tomorrow) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateString = tomorrow.toISOString().split("T")[0];
      setForm((prev) => ({
        ...prev,
        from_date: dateString,
        to_date: dateString,
      }));
    }
  }, [form.only_tomorrow]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Helper to get today's date for "min" attribute (prevent past dates)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <BackButton />
        <h2 className="text-2xl font-black text-slate-800 flex-1 text-center pr-10">
          Apply Leave
        </h2>
      </div>

      <div className="space-y-8">
        {/* Section 1: Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <FileText size={16} className="text-indigo-600" />
              Leave Type
            </label>
            <div className="relative">
              <select
                name="leave_type"
                value={form.leave_type}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="">Select Category...</option>
                <option value="casual">Casual Leave</option>
                <option value="medical">Medical Leave</option>
                <option value="emergency">Emergency Leave</option>
              </select>
              {/* Custom Arrow Icon for Select */}
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <UserCheck size={16} className="text-indigo-600" />
              Approver Authority
            </label>
            <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-medium flex items-center justify-between cursor-not-allowed">
              <span>Warden / Admin</span>
              <span className="text-xs bg-slate-200 px-2 py-1 rounded">Auto-assigned</span>
            </div>
          </div>
        </div>

        {/* Section 2: Timing & Duration */}
        <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 space-y-6">

          {/* Toggles */}
          <div className="flex flex-col sm:flex-row gap-6">
            <ToggleOption
              label="Only for Tomorrow"
              name="only_tomorrow"
              checked={form.only_tomorrow}
              onChange={handleChange}
              desc="Auto-fills dates for next day"
            />
          </div>

          {/* Date Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-600" />
                From Date
              </label>
              <input
                type="date"
                name="from_date"
                min={today}
                disabled={form.only_tomorrow}
                value={form.from_date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none disabled:bg-slate-100 disabled:text-slate-400 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-600" />
                To Date
              </label>
              <input
                type="date"
                name="to_date"
                min={form.from_date || today}
                disabled={form.only_tomorrow}
                value={form.to_date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none disabled:bg-slate-100 disabled:text-slate-400 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Reason */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <AlertCircle size={16} className="text-indigo-600" />
            Reason for Leave
          </label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-400"
            placeholder="Please describe why you need leave (e.g., Going home for sister's wedding)..."
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100">
          <Button onClick={() => navigate(-1)} variant="text" className="px-6 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold transition-colors">Cancel</Button>

          <Button type="submit" variant="success" className="md:px-8 md:py-2.5 rounded-2xl transition-all cursor-pointer">
            Submit Application</Button>
        </div>
      </div>
    </div>
  );
};

const ToggleOption = ({ label, name, checked, onChange, desc }) => (
  <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${checked ? 'bg-white border-indigo-600 ring-1 ring-indigo-600' : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200'}`}>
    <div className="relative flex items-center mt-1">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${checked ? 'bg-indigo-600 border-indigo-600' : 'border-slate-400 bg-white'}`}>
        {checked && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
      </div>
    </div>
    <div>
      <span className={`block text-sm font-bold ${checked ? 'text-indigo-900' : 'text-slate-700'}`}>{label}</span>
      <span className="text-xs text-slate-500">{desc}</span>
    </div>
  </label>
);

export default LeaveForm;