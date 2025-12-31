const ActionCard = ({ icon, title, children, color }) => {
    return (
        <div className={`rounded-lg p-4 ${color}  `}>
            <div className="flex items-center gap-2 font-semibold mb-2 hover:">
                {icon} {title}
            </div>
            <div className="text-sm">{children}</div>
        </div>
    );
};

export default ActionCard;
