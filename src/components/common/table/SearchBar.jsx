import { Search } from "lucide-react"

const SearchBar = ({ search, onChange, placeholder, className }) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full pl-10!  input ${className}`}
            />
        </div>
    )
}

export default SearchBar