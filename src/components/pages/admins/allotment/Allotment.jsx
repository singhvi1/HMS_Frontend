import React from 'react';
import { Plus, Search, Filter, Home, Users, AlertCircle } from 'lucide-react';

const Allotment = () => {
  // Mock data for the stats cards
  const stats = [
    { label: 'Total Rooms', value: '150', icon: Home, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Students Allotted', value: '124', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Pending Requests', value: '8', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        
        {/* Top Row: Title & Main Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Room Allotment</h1>
            <p className="text-sm text-gray-500 mt-1">Manage room assignments and student requests.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
              <Filter size={18} />
              <span>Filters</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm text-sm font-medium">
              <Plus size={18} />
              <span>New Allotment</span>
            </button>
          </div>
        </div>

        {/* Middle Row: Search Bar */}
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="Search by student name, roll number, or room ID..."
            />
        </div>

        {/* Bottom Row: Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className={`p-3 rounded-full ${stat.bg} ${stat.color} mr-4`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* --- CONTENT AREA (Placeholder) --- */}
      <div className="p-6">
        {/* Your table or list of students goes here */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center text-gray-400">
          Content Area (Student List Table)
        </div>
      </div>

    </div>
  );
};

export default Allotment;