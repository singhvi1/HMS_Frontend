import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "./ui/Button";

const AccordionItem = ({
    isOpen,
    onToggle,
    title,
    icon: Icon,
    children,
    rightSlot
}) => {
    return (
        <div className="bg-white  rounded-xl overflow-hidden transition-all duration-300">
            <Button
                variant="text"
                onClick={onToggle}
                className="w-full flex items-start justify-between p-5 text-left hover:bg-gray-50"
            >
                <div className="flex gap-4">
                    {Icon && (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                            <Icon size={18} className="text-indigo-600" />
                        </div>
                    )}
                    <div>{title}</div>
                </div>

                <div className="flex items-center gap-3">
                    {rightSlot}
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
            </Button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-5 pb-6 ml-14">{children}</div>
            </div>
        </div>
    );
};

export default AccordionItem;
