import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCcw } from "lucide-react";

import {
    forceVerificationRequestRefresh,
    selectVerificationRequestsFilters,
    selectVerificationRequestsMeta,
    selectVerificationRequestsPageData,
    setVerificationRequests,
    setVerificationRequestsError,
    setVerificationRequestsFilters,
    setVerificationRequestsPage,
    setVerificationRequestsPageSize
} from "../../../../utils/store/verificationRequestSlice";

import { allotmentService } from "../../../../services/apiService";
import Table from "../../../common/table/Table";
import Pagination from "../../../common/table/Pagination";
import SearchBar from "../../../common/table/SearchBar";
import Button from "../../../common/ui/Button";
import PageLoader from "../../../common/PageLoader";
import { verificationRequestColumns } from "../../../../../MockData";
import { useNavigate } from "react-router-dom";
import useVerificationStatus from "../../../../customHooks/useVerification";
import ExcelDownloadButton from "../../../common/ui/downloadbutton/ExcelDownloadButton";


const VerificationRequestTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { verifyStudent } = useVerificationStatus()



    const filters = useSelector(selectVerificationRequestsFilters);
    const excelFilters = {
        phase: filters?.phase || "both",
        verification_status: filters?.verification_status || "all",

    }
    const { items, page, limit, pages } =
        useSelector(selectVerificationRequestsPageData);

    const { loading, error, } =
        useSelector(selectVerificationRequestsMeta);



    const fetchRequests = useCallback(async () => {
        try {
            const res = await allotmentService.getVerificationList({
                page,
                limit,
                ...filters
            });

            dispatch(setVerificationRequests(res.data));
            // console.log(res.data)
        } catch (err) {
            dispatch(
                setVerificationRequestsError(
                    err?.response?.data?.message || "Failed to load requests"
                )
            );
        }
    }, [dispatch, page, limit, filters]);

    useEffect(() => {
        if (!loading) return;
        fetchRequests();
    }, [fetchRequests, loading]);


    const renderContent = () => {
        if (loading && items?.length === 0) return <PageLoader />;

        if (error)
            return (
                <div className="p-8 text-center text-red-500 font-medium">
                    Error: {error}
                </div>
            );

        if (!loading && items?.length === 0)
            return (
                <div className="py-12 text-center text-gray-500">
                    No verification requests found.
                </div>
            );
        return (
            <>
                <Table columns={verificationRequestColumns(navigate, verifyStudent)} data={items} />
                <Pagination
                    currPage={page}
                    totalPages={pages}
                    onPageChange={(p) =>
                        dispatch(setVerificationRequestsPage(p))
                    }
                />
            </>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    Student Room Verification Requests
                    <ExcelDownloadButton type="allotment" filters={excelFilters} />
                </h2>

                <Button
                    variant="text"
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                    onClick={() => dispatch(forceVerificationRequestRefresh())}
                    title="Refresh"
                >
                    <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                <SearchBar
                    search={filters?.search}
                    onChange={(v) =>
                        dispatch(setVerificationRequestsFilters({ search: v }))
                    }
                    placeholder="Search student / SID"
                />

                <select
                    className="input"
                    value={filters?.phase}
                    onChange={(e) =>
                        dispatch(setVerificationRequestsFilters({ phase: e.target.value }))
                    }
                >
                    <option value="">All Phases</option>
                    <option value="A">Phase A</option>
                    <option value="B">Phase B</option>
                </select>

                <select
                    className="input"
                    value={filters?.verification_status}
                    onChange={(e) =>
                        dispatch(
                            setVerificationRequestsFilters({
                                verification_status: e.target.value
                            })
                        )
                    }
                >
                    <option value="">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="VERIFIED">Verified</option>
                    <option value="REJECTED">Rejected</option>
                </select>

                <select
                    className="input"
                    value={limit}
                    onChange={(e) =>
                        dispatch(setVerificationRequestsPageSize(+e.target.value))
                    }
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            {renderContent()}
        </div>
    );
};

export default VerificationRequestTable;
