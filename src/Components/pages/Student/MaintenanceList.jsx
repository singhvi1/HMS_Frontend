import { useState } from "react";
import { maintenanceMockData } from "../../../../data";
import { statusColors } from "../../../utils/constant";

const MaintenanceList = () => {
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState(null);
  const [data] = useState(maintenanceMockData);

  const filteredData =
    filter === "all"
      ? data
      : data.filter((item) => item.status === filter);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">
            Maintenance Requests
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            + Raise Request
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["all", "pending", "in_progress", "resolved"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
                filter === s
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              {s.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredData.map((item) => {
            const isOpen = activeId === item._id;

            return (
              <div
                key={item._id}
                className="bg-white border rounded-lg shadow-sm"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(item._id)}
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-blue-50"
                >
                  <div>
                    <h2 className="font-semibold text-blue-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.category} • Room {item.block}-{item.room_number}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${statusColors[item.status]}`}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-4 pb-4 border-t text-sm text-gray-700">
                    <p className="mt-3">{item.description}</p>

                    {item.staff_remark && (
                      <p className="mt-3 bg-blue-50 border-l-4 border-blue-500 p-2 rounded">
                        <strong>Staff Remark:</strong> {item.staff_remark}
                      </p>
                    )}

                    <p className="text-xs text-gray-400 mt-3">
                      Created on{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredData.length === 0 && (
            <p className="text-center text-gray-500">
              No maintenance requests found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceList;
