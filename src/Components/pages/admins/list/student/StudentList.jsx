import Table from '../../../../common/table/Table'
import SearchBar from '../../../../common/table/SearchBar'
import Pagination from '../../../../common/table/Pagination'
import { studentColumns } from '../../../../../../MockData'
import { useDispatch, useSelector } from 'react-redux'
import { selectStudentPageData, selectStudentsFilters, setStudents, setStudentsFilters, setStudentsPage, setStudentsPageSize } from '../../../../../utils/store/studentSlice'
import Button from '../../../../common/ui/Button'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../../../common/ui/Backbutton'
import { studentService } from '../../../../../services/apiService'
import { useEffect } from 'react'

const StudentList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const filters = useSelector(selectStudentsFilters);
    const pageData = useSelector(selectStudentPageData);

    const fetchData = async () => {
        try {
            const res = await studentService.getAllStudents({
                page: pageData.page,
                limit: pageData.pageSize,
                block: filters.block,
                branch: filters.branch,
                search: filters.search,
                status: filters.status,
            })
            console.log(res.data)
            console.log("total Pages", res.data.pagination.total)
            dispatch(setStudents({
                items: res.data.students,
                pagination: {
                    page: res.data.pagination.page,
                    pageSize: res.data.pagination.limit,
                    totalItems: res.data.pagination.total,
                    totalPages: res.data.pagination.pages,
                }

            }))

        } catch (error) {
            console.log("dont able to find student", error)
        }
    }
    useEffect(() => { fetchData() },
        [filters.search, filters.block, filters.branch, filters.status, pageData.page, pageData.pageSize])
    return (
        <>
            <div className="bg-white rounded-xl shadow p-6">
                <BackButton />
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
                    <SearchBar search={filters.search} onChange={(v) => dispatch(setStudentsFilters({ search: v }))} placeholder={"Search name, sid, RoomNo"} />
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
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="">All Status</option>
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
                <Table columns={studentColumns(navigate)}
                    data={pageData.items} />

                <Pagination currPage={pageData.page}
                    totalPages={pageData.totalPages} onPageChange={(p) => dispatch(setStudentsPage(p))} />
            </div>
        </>
    )
}

export default StudentList
