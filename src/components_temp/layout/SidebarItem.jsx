const SideBarItem = ({ icon: Icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 cursor-pointer"
    >
      <Icon size={18} />
      <span>{label}</span>
    </div>
  );
};

export default SideBarItem;
