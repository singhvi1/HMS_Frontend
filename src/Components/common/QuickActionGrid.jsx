import { Link } from "react-router-dom";
import ActionCard from "./ActionCard";

const QuickActionsGrid = ({ title = "Quick Actions", actions = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <Link to={action.to} key={index}>
              <ActionCard
                icon={<Icon size={18} />}
                title={action.title}
                color={action.color}
              >
                {action.description}
              </ActionCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActionsGrid;
