import ProfileAvatar from "../../profile/ProfileAvatar";

export const InfoItem = ({ label, value }) => (
    <div className="space-y-0.5">
        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-800 leading-tight">{value}</p>
    </div>
);
export const StatusBadge = ({ status }) => {
    const isActive = status === 'active';

    return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${isActive
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-slate-50 border-slate-200 text-slate-600"
            }`}>
            {/* simple dot indicator */}
            <span className={`h-2 w-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
            <span className="text-xs font-bold uppercase tracking-wide">{status}</span>
        </div>
    );
};
export const ProfileHeader = ({ student, InfoItem }) => (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 md:flex items-start gap-10">
            <div className="relative group shrink-0 mb-6 md:mb-0">
                <ProfileAvatar image_url={student?.image_url || "	https://avatars.githubusercontent.com/u/120703712?v=4"}
                    size={220} />

            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight" data-testid="text-name">{student?.user_id?.full_name}</h1>
                    <p className="text-indigo-600 font-bold text-lg">{student?.user_id?.email}</p>
                    <p className="text-slate-500 font-medium">Student ID: {student?.sid}</p>
                    <StatusBadge status={student?.user_id?.status} />
                </div>


                <div className="grid grid-cols-2 gap-4 text-slate-100">
                    <InfoItem label="Branch" value={student?.branch} />
                    <InfoItem label="Personal Contact" value={student?.user_id?.phone} />
                    <InfoItem label="Room" value={student?.room_id ? `${student.room_id?.block.toUpperCase()}-${student.room_id?.room_number}` : "-"} />
                    <InfoItem label="Guardian" value={student?.guardian_name} />
                    <InfoItem label="Guardian Contact" value={student?.guardian_contact} />
                    <InfoItem label="Address" value={student?.permanent_address} />

                </div>
            </div>
        </div>
    </div>
);
export const Imp = () => (
    <span className="text-red-500">*</span>
)
export const Filters = ({ status, priority, onChange }) => {
    return (
        <div className="flex gap-3 mb-4">
            <select
                className="border p-2 rounded"
                value={status}
                onChange={e => onChange("status", e.target.value)}
            >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
            </select>

            <select
                className="border p-2 rounded"
                value={priority}
                onChange={e => onChange("priority", e.target.value)}
            >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
    );
};