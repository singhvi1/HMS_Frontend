import Table from '../../../../common/table/Table'
import SearchBar from '../../../../common/table/SearchBar'
import Pagination from '../../../../common/table/Pagination'
import { studentColumns } from '../../../../../../MockData'
import { useDispatch, useSelector } from 'react-redux'
import { forceStudentRefresh, selectStudentAllState, selectStudentPageData, selectStudentsFilters, setStudentError, setStudents, setStudentsFilters, setStudentsPage, setStudentsPageSize } from '../../../../../utils/store/studentSlice'
import Button from '../../../../common/ui/Button'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../../../common/ui/Backbutton'
import { studentService } from '../../../../../services/apiService'
import { useCallback, useEffect } from 'react'
import { useDebounce } from '../../../../../customHooks/useDebounce'
import useStudentDelete from '../../../../../customHooks/useStudentDelete'
import PageLoader from '../../../../common/PageLoader'
import { RefreshCcw } from 'lucide-react'


const StudentList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const filters = useSelector(selectStudentsFilters);
    const { items, page, limit, pages } = useSelector(selectStudentPageData);
    const { loading, error } = useSelector(selectStudentAllState);
    const { deleteStudent } = useStudentDelete()


    const debouncedSearch = useDebounce(filters.search, 600);
    const fetchData = useCallback(async () => {
        try {
            const res = await studentService.getAllStudents({
                page: page,
                limit: limit,
                block: filters.block,
                branch: filters.branch,
                search: debouncedSearch,
                status: filters.status,
            });
            dispatch(setStudents(res.data))
        } catch (error) {
            dispatch(setStudentError(error?.message || "Not able to fetch student"));
            console.log("Not able to fetch student list", error?.message);
        }
    }, [page, limit, filters.block, filters.branch, filters.status, debouncedSearch, dispatch]);

    useEffect(() => {
        if (!loading || error) return;
        fetchData();
    }, [error, fetchData, loading]);


    const fetchStudentTable = () => {
        if (loading && items.length === 0) {
            return <PageLoader />
        }
        if (error) {
            return <h1>Error Page : {error}</h1>
        }
        if (!loading && items?.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <p className="text-lg">No Studnet List found.</p>
                </div>
            )
        }
        return (
            <>
                <Table columns={studentColumns(navigate, deleteStudent)}
                    data={items} />

                <Pagination
                    currPage={page}
                    totalPages={pages}
                    onPageChange={(p) => dispatch(setStudentsPage(p))}
                />
            </>
        )

    }
    return (
        <>
            <div className="bg-white rounded-xl shadow p-6">
                <BackButton />
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1 items-center-safe">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Student List
                        </h2>
                        <Button
                            variant="text"
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                            onClick={() => dispatch(forceStudentRefresh())}
                            title="Refresh List"
                        >
                            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                        </Button>
                    </div>
                    <Button
                        variant="success"
                        onClick={() => navigate("/admin/students/new")}
                        className='p-2 cursor-pointer'
                    >
                        + Add Student
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <SearchBar search={filters.search} onChange={(v) => dispatch(setStudentsFilters({ search: v }))} placeholder={"Name, sid, RoomNo"} />


                    <select
                        className="input"
                        value={filters.block}
                        onChange={(e) =>
                            dispatch(setStudentsFilters({ block: e.target.value }))
                        }
                    >
                        <option value="">All Blocks</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
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
                        <option value="electrical">EE</option>
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
                        value={limit}
                        onChange={(e) =>
                            dispatch(setStudentsPageSize(Number(e.target.value)))
                        }
                    >
                        <option value={10}>10 / page</option>
                        <option value={20}>20 / page</option>
                        <option value={50}>50 / page</option>
                    </select></div>
                {fetchStudentTable()}
            </div>

        </>
    )
}

export default StudentList
