const AdminActionsPanel = ({ title, actions = [] }) => {
    if (!actions.length) return null;
    return (
        <div className="bg-white rounded-xl shadow p-4 my-4 space-y-4">
            <h3 className="font-semibold text-lg">{title}</h3>

            <div className="grid sm:grid-cols-3 grid-cols-2 gap-3">
                {actions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={idx}
                            onClick={action.onClick}
                            disabled={action.disabled}
                            className={`
                flex items-center gap-2 px-3 py-2 rounded text-sm
                ${action.className}
                ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
                        >
                            {Icon && <Icon size={16} />}
                            {action.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminActionsPanel;
