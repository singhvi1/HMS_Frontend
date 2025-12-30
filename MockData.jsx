import { useNavigate } from "react-router-dom";

export const studentColumns = [
    { key: "sid", label: "SID" },
    {
        key: "full_name", label: "Name",
        render: (row) => (
            <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => {
                    const navigate = useNavigate()
                    navigate(`/admin/students/${row._id}`)
                }}
            >
                {row.full_name}
            </span>
        )
    },
    { key: "branch", label: "Branch" },
    { key: "year", label: "Year" },
    { key: "block", label: "Block" },
    { key: "room_number", label: "Room" },
    {
        key: "status",
        label: "Status",
    }
];