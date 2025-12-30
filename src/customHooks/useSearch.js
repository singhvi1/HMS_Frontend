import { useMemo } from 'react'

const useSearch = (
    { search = "", students = [], searchCol = [] }) => {


    const filteredStudents = useMemo(() => {
        if (!search) return students;
        
        const q = search.toLowerCase();
        return students.filter((student) =>
            searchCol.some((col) => String(student[col] || "")
                .toLowerCase().includes(q)
            )
        )
    }, [search, students, searchCol])


    return filteredStudents;
}

export default useSearch
