import Table from '../../../common/table/Table'
import SearchBar from '../../../common/table/SearchBar'
import Pagination from '../../../common/table/Pagination'
import { studentColumns } from '../../../../../data'
import { useDispatch, useSelector } from 'react-redux'
import { selectStudentPageData, selectStudentsFilters, setStudentsFilters, setStudentsPage, setStudentsPageSize } from '../../../../utils/store/studentSlice'
import Button from '../../../common/ui/Button'
import { useNavigate } from 'react-router-dom'

const StudentList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const filters = useSelector(selectStudentsFilters);
    const pageData = useSelector(selectStudentPageData);

    return (
        <>
            <div className="bg-white rounded-xl shadow p-6">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Student List
                    </h2>
                    <Button
                        variant="success"
                        onClick={() => navigate("/admin/students/new")}
                        className='p-2 cursor-pointer' 
                    >
                        + Add Student
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <SearchBar search={filters.search} onChange={(v) => dispatch(setStudentsFilters({ search: v }))} placeholder={"Search name, sid room, block"} />
                    <select
                        className="input"
                        value={filters.block}
                        onChange={(e) =>
                            dispatch(setStudentsFilters({ block: e.target.value }))
                        }
                    >
                        <option value="">All Blocks</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                    <select
                        className="input"
                        value={filters.branch}
                        onChange={(e) =>
                            dispatch(setStudentsFilters({ branch: e.target.value }))
                        }
                    >
                        <option value="">All Branches</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="ME">ME</option>
                    </select>
                    <select
                        className="input"
                        value={filters.status}
                        onChange={(e) =>
                            dispatch(setStudentsFilters({ status: e.target.value }))
                        }
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select><select
                        className="input"
                        value={pageData.pageSize}
                        onChange={(e) =>
                            dispatch(setStudentsPageSize(Number(e.target.value)))
                        }
                    >
                        <option value={10}>10 / page</option>
                        <option value={20}>20 / page</option>
                        <option value={50}>50 / page</option>
                    </select>
                </div>
                <Table columns={studentColumns}
                    students={pageData.items} />

                <Pagination currPage={pageData.page} totalPages={pageData.totalPages} onPageChange={(p) => dispatch(setStudentsPage(p))} />
            </div>
        </>
    )
}

export default StudentList
