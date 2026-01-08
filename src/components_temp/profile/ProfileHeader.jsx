import React from 'react';
import { Mail, Phone, MapPin, Building2, User, PhoneCall, Hash } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';
import { StatusBadge } from '../common/ui/ProfileComponents';

const ProfileHeader = ({ student }) => {
    const room = student?.room_id
        ? `${student.room_id?.block?.toUpperCase()}-${student.room_id?.room_number}`
        : "Not Assigned";

    return (
        <div className="space-y-6">
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                <div className="h-32 bg-linear-to-r from-indigo-600 to-blue-500 relative p-2">
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium border border-white/30">
                        Student Portal
                    </div>
                </div>

                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">

                        {/* 2. Avatar (Negative Margin to pull it up) */}
                        <div className="-mt-12 relative rounded-full border-4 border-white shadow-md bg-white">
                            <ProfileAvatar
                                image_url={student?.image_url || "https://avatars.githubusercontent.com/u/120703712?v=4"}
                                name={student?.user_id?.full_name}
                                size={180}
                            />
                        </div>

                        <div className="flex-1 pt-4 space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                        {student?.user_id?.full_name || "Unknown Student"}
                                    </h1>
                                    <div className="flex items-center gap-3 mt-1">
                                        <p className="text-slate-500 font-medium text-sm flex items-center gap-1.5">
                                            <Mail size={14} /> {student?.user_id?.email}
                                        </p>
                                        <span className="text-slate-300">|</span>
                                        <p className="text-slate-500 font-medium text-sm">
                                            SID: <span className="text-slate-900 font-bold">{student?.sid}</span>
                                        </p>
                                    </div>
                                </div>
                                <StatusBadge status={student?.user_id?.status} />
                            </div>

                            <hr className="my-6 border-slate-100" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                                <DetailItem
                                    icon={Hash}
                                    label="Branch"
                                    value={student?.branch}
                                />
                                <DetailItem
                                    icon={Phone}
                                    label="Personal Contact"
                                    value={student?.user_id?.phone}
                                />
                                <DetailItem
                                    icon={Building2}
                                    label="Room Number"
                                    value={room}
                                />
                                <DetailItem
                                    icon={User}
                                    label="Guardian Name"
                                    value={student?.guardian_name}
                                />
                                <DetailItem
                                    icon={PhoneCall}
                                    label="Guardian Contact"
                                    value={student?.guardian_contact}
                                />
                                <DetailItem
                                    icon={MapPin}
                                    label="Permanent Address"
                                    value={student?.permanent_address}
                                    isFullWidth
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon: Icon, label, value, isFullWidth }) => (
    <div className={`flex items-start gap-3 ${isFullWidth ? 'sm:col-span-2 lg:col-span-3' : ''}`}>
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
            <Icon size={18} />
        </div>
        <div>
            <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-slate-900 leading-snug">
                {value || <span className="text-slate-300 italic">Not provided</span>}
            </p>
        </div>
    </div>
);

export default ProfileHeader;