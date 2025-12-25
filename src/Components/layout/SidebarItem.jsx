const SideBarItem = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default SideBarItem;