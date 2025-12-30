const SearchBar = ({ search, onChange, placeholder }) => {
    return (
        <div className=" w-full">
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => onChange(e.target.value)}
                className="w-full input"
            />
        </div>
    )
}

export default SearchBar