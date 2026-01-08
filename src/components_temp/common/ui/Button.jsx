const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = ""
}) => {
    const base =
        "rounded font-medium transition disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-black text-white hover:bg-gray-900 cursor-pointer",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer",
        danger: "bg-red-600 text-white hover:bg-red-700 cursor-pointer",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer",
        text: "cursor-pointer",
        success: "bg-blue-600 text-white hover:bg-green-600 cursor-pointer",

    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
