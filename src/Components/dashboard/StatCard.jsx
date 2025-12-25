


const StatCard = ({ icon, label, value, color }) => (
  <div className={`rounded-lg p-4 ${color}`}>
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);



export default StatCard
