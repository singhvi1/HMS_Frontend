const Button = ({
    children,
    onClick,
    title,
    type = "button",
    variant = "primary",
    disabled = false,
    className = ""
}) => {
    const base =
        "relative rounded font-medium transition disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-black text-white hover:bg-gray-900",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        tertiary: "bg-green-400 text-gray-800 hover:bg-green-500",
        danger: "bg-red-600 text-white hover:bg-red-700",   
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        text: "",
        success: "bg-blue-600 text-white hover:bg-green-600",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${className} group cursor-pointer `}
        >
            {children}

            {title && (
                <span className="
                    absolute -top-9 left-1/2 -translate-x-1/2
                    whitespace-nowrap
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition
                    pointer-events-none
                ">
                    {title}
                </span>
            )}
        </button>
    );
};

export default Button;
