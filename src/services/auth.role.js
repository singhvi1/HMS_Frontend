import { useSelector } from "react-redux";
import { selectLoggedinRole } from "../utils/store/logedinUser"
const RoleGuard = ({ allow = [], children }) => {

    const role = useSelector(selectLoggedinRole);
    // console.log(role)
    if (!allow.includes(role)) return null;
    return children;
};

export default RoleGuard;
