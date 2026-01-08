import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BackButton = ({ label = "Back", className = "" }) => {
  const navigate = useNavigate();

  return (
    <Button variant="text"
      onClick={() => navigate(-1)}
      className={`mb-4 flex items-center text-sm text-gray-600 hover:text-black transition ${className} cursor-pointer `}>
      <ArrowLeft className="w-4 h-4 mr-1" />
      {label}
    </Button>
  );
};

export default BackButton;
