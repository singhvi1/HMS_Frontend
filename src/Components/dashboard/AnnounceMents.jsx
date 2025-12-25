import { Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AnnounceMents = ({ announcements }) => {
    const navigate=useNavigate()

    console.log("announcements called")
    return (
        <div>
            {
                announcements.map((announcement) => (
                    <div
                        key={announcement.id}
                        className="transform transition-all duration-300 hover:scale-[1.02] cursor-pointer p-2 "
                        onClick={()=>{
                            navigate(`/admin/ann/${announcement.id}`)
                        }}
                    >
                        <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start p-4">
                                <div className={`rounded-lg p-3 ${announcement.color} mr-4`}>
                                    <announcement.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-800">
                                        {announcement.title}
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        {announcement.description}
                                    </p>
                                    <div className="flex items-center mt-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span>{announcement.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default AnnounceMents
