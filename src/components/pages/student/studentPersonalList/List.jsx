import { useState } from 'react';
import IssuesList from './IssuesList';
import LeaveList from './LeaveList';
import Button from '../../../common/ui/Button';

const List = ({ studentId }) => {
    const [tab, setTab] = useState("issue")

    return (
        <>
            <div className="mt-6">
                <div className="flex justify-around border-b mb-4">
                    <Button
                        variant='text'
                        onClick={() => setTab("issue")}
                        className={`px-4 py-2 ${tab === "issue"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        Issues List
                    </Button>
                    <Button
                        variant='text'
                        onClick={() => setTab("leave")}
                        className={`px-4 py-2 ${tab === "leave"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        Leave Requests
                    </Button>


                </div>

                {tab === "issue" && <IssuesList studentId={studentId} />}
                {tab === "leave" && <LeaveList studentId={studentId} />}


            </div>
        </>
    )
}

export default List
