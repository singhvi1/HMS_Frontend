import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useComments } from "../../../customHooks/useComment";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedinUserAllState } from "../../../utils/store/logedinUser";
import { setCommentsLoading } from "../../../utils/store/commentSlice";
import { RefreshCcw } from "lucide-react";

const CommentsSection = ({ issueId = "" }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const { id } = useSelector(selectLoggedinUserAllState)
    const { fetchComments, createComment, items: comments, loading, error } = useComments("issue", issueId);



    useEffect(() => {
        if (!issueId) return
        fetchComments();
    }, [fetchComments, issueId])

    const handleAddComment = async () => {
        if (!text.trim()) return;
        try {
            await createComment({
                issue_id: issueId,
                comment_text: text,
            })
            setText("")
        } catch (err) {
            console.log("Not able to add comment ", err)
        }
    };

    const renderComments = () => {
        if (error) {
            return (
                <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                </div>
            )
        }
        if (loading) {
            return (<p className="text-sm text-gray-400 mb-4">Loading</p>)
        }
        if (!loading && comments.length === 0) {
            return (<p className="text-sm text-gray-500 mb-4">
                No comments yet. Be the first to respond.
            </p>)
        }



        return comments?.map((c) => {
            const isMine = c?.commented_by?._id === id;
            //comment section
            return (
                <div
                    key={c?._id}
                    className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}
                >
                    <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm relative ${isMine ? "bg-blue-500 text-white rounded-tr-none" : "bg-gray-100 text-gray-800 rounded-tl-none"} `}>
                        <div className={`text-xs font-bold mb-1 ${isMine ? "text-blue-100" : "text-gray-600"}`}>
                            {c?.commented_by?.full_name || "Unknown User"}
                        </div>

                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {c?.comment_text}
                        </p>

                        <div className={`text-[10px] mt-2 text-right ${isMine ? "text-blue-200" : "text-gray-400"}`}>
                            {new Date(c.createdAt).toLocaleString([], {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                        </div>
                    </div>
                </div>
            );
        })


    }

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg text-center font-semibold text-gray-800 mb-4">Discussion
                <Button
                    variant="text"
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                    onClick={() => dispatch(setCommentsLoading())}
                    title="Refresh List"
                >
                    <RefreshCcw size={15} className={loading ? "animate-spin" : ""} />
                </Button></h3>
            <h3 className="font-medium text-gray-700 mb-4">
                Comments
            </h3>



            <div className="space-y-4 mb-4">

                <div className="border-t pt-4">
                    <textarea
                        className="input w-full mb-3"
                        rows={3}
                        placeholder="Write a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button
                        variant="outline"
                        className="p-1"
                        disabled={loading}
                        onClick={handleAddComment}>
                        Add Comment
                    </Button>
                </div>

                <div className="border-t pt-4"></div>
                {renderComments()}
            </div>

        </div>
    );
};

export default CommentsSection;
