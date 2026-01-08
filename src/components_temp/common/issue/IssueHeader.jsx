import React from "react";
import BackButton from "../ui/Backbutton";

const IssueHeader = ({ issueId }) => {
    return (
        <div className="flex items-center justify-between">
            <BackButton />
            <span className="text-sm text-gray-400 font-mono">
                ID: {issueId?.slice(-6).toUpperCase()}
            </span>
        </div>
    );
};

export default IssueHeader;
