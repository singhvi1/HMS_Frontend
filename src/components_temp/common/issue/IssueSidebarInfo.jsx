import { Building, Tag, PhoneCall } from 'lucide-react';

const IssueSidebarInfo = ({ issue }) => {
    if (!issue) return;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Ticket Details</h3>

            <div className="space-y-4">
                {/* Category Item */}
                <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <Tag size={30} />
                    </div>
                    <div>
                        <p className="text-s text-gray-500">Category</p>
                        <p className="font-medium capitalize text-sm">{issue.category}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <Building size={30} />
                    </div>
                    <div>
                        <p className="text-s text-gray-500">Room Number</p>
                        <p className="font-medium text-sm">
                            Block  <b>{issue?.raised_by?.room_id?.block?.toUpperCase()} — {issue?.raised_by?.room_id?.room_number}</b>
                        </p>
                    </div>
                </div>


                <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <PhoneCall color="#10b981" size={30} />
                    </div>
                    <div>
                        <p className="text-s text-gray-500">Category</p>
                        <p className="font-medium capitalize text-sm">{issue.raised_by?.user_id.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueSidebarInfo;