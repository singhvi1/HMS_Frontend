const IssueDetailsCard = ({ issue }) => {
    if (!issue) return;
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                            {issue.title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Posted by <span className="font-medium text-gray-700">{issue?.raised_by?.user_id.full_name || "Student"}</span>
                            {' '}•{' '}
                            {issue?.createdAt
                                ? new Date(issue.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                : "Date N/A"
                            }
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusStyle(issue.status)}`}>
                        {issue.status?.replace('_', ' ')}
                    </span>
                </div>

                <hr className="border-gray-100 my-6" />

                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        Description
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                            {issue.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetailsCard;