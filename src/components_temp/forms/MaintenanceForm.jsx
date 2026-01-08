import { useState } from 'react';
import toast from 'react-hot-toast';
import { Wrench, PenTool as Tool, Type } from 'lucide-react'; // Added Type icon for title
import { student } from '../../../data';
import BackButton from '../common/ui/Backbutton';
import { issueService } from '../../services/apiService';
import Button from '../common/ui/Button';
import { Imp } from '../common/ui/ProfileComponents';

const MaintenanceForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });

  const submitForm = async () => {
    try {
      const res = await issueService.createIssues(form);
      toast.success('Maintenance request submitted successfully!');
      setForm({ description: "", category: "", title: "" });
    } catch (err) {
      console.log("Not able to generate issue", err?.message);
      toast.error("Failed to submit request.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Shared input styles for consistency
  const inputClasses = "w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 pl-10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

  return (
    <div className="max-w-3xl mx-auto"> {/* Added container for centering */}
      <div className="bg-white rounded-xl shadow-lg p-8 m-5 border border-gray-100">
        <BackButton />

        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-8 mt-4">
          <div className="p-3 bg-indigo-100 rounded-xl shadow-sm">
            <Wrench className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Maintenance Request</h2>
            <p className="text-gray-500 text-sm mt-1">
              Submit a request for room: <span className="font-medium text-gray-700">{student?.room_number || "N/A"}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <Imp />
            </label>
            <div className="relative">
              <select
                name='category'
                value={form.category}
                onChange={handleChange}
                className={`${inputClasses} appearance-none cursor-pointer bg-white`}
              >
                <option value="">Select Category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="furniture">Furniture</option>
                <option value="cleaning">Cleaning</option>
                <option value="other">Other</option>
              </select>
              <Tool className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Issue Title <Imp />

            </label>         <div className="relative">
              <input
                type="text"
                value={form.title}
                name='title'
                onChange={handleChange}
                placeholder='Briefly summarize the issue'
                className={inputClasses}
              />
              <Type className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <Imp />
            </label>
            <textarea
              name='description'
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-lg border border-gray-300 shadow-sm p-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Please describe the issue in detail..."
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            variant='text'
            type="submit"
            // Fixed gradient syntax: bg-gradient-to-r instead of bg-linear-to-r
            className="w-full bg-linear-to-r from-indigo-600 to-blue-500 text-white font-semibold py-3.5 px-6 rounded-lg hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
          >
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;