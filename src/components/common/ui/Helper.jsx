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