
const Table = ({ columns = [], data = [] }) => {
    return (
        <div className='p-6 bg-gray-50 '>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 ">
                List 
            </h2><div className="flex justify-center w-full mt-4">

            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className='min-w-full border border-gray-200 text-sm'>
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            {columns?.map((col) => (
                                <th key={col.key} className='px-4 py-3 border'>{col.label}</th>
                            ))}
                        </tr>

                    </thead>
                    <tbody>
                        {data?.map((student, indx) => (
                            <tr key={student._id || indx} className='hover:bg-gray-50 transition border-t cursor-pointer'>
                                {columns?.map((col) => (
                                    <td key={col.key} className='px-4 py-2 border'> {col.render ? col.render(student) : student[col.key]}</td>
                                ))}
                            </tr>
                        ))}

                    </tbody>


                </table>
            </div>
        </div>
    )
}

export default Table
