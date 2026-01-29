import { AlertCircle, Megaphone } from "lucide-react";
import Button from "../ui/Button";

const NotFoundView = () => (

    <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <Megaphone size={32} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No announcements yet</h3>
        <p className="text-slate-500 max-w-sm mt-1">
            There are currently no active announcements to display. Check back later!
        </p>
    </div>

);

export default NotFoundView
