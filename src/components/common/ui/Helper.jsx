export const StatItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
            {label}
        </span>
        <span className="text-gray-900 font-medium text-base truncate">
            {value || "N/A"}
        </span>
    </div>
);


export const Imp = () => (

    <span className="text-red-500!">*</span>
)

export const Tags = ({ categoryStyle, category }) => (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${categoryStyle}`}>
        {category}
    </span>

)