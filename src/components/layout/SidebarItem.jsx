const SideBarItem = ({ icon: Icon, label, onClick, active }) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 p-3 rounded-xl cursor-pointer 
        transition-all duration-300 ease-in-out group relative
        ${active
          ? "bg-linear-to-r from-red-600 to-amber-500 text-white shadow-md shadow-red-200 scale-[1.02]"
          : "text-gray-600 hover:bg-amber-50 hover:text-red-700 hover:pl-5"
        }
      `}
    >
      {/* Red vertical accent bar for non-active items on hover */}
      {!active && (
        <div className="absolute left-0 w-1 h-0 bg-red-600 transition-all duration-300 group-hover:h-3/5 rounded-r-full" />
      )}

      <div className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
        <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      </div>

      <span className={`text-sm font-bold tracking-wide ${active ? "text-white" : "group-hover:font-extrabold"}`}>
        {label}
      </span>
    </div>
  );
};

export default SideBarItem;
