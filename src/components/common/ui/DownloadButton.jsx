import { useState } from 'react'
import Button from './Button';
import { ArrowDownToLine } from 'lucide-react';
import { studentService } from '../../../services/apiService';

const DownloadButton = ({ studentId }) => {

    const [loading, setLoading] = useState(false);
    const handleDownload = async () => {
        try {
            setLoading(true);
            const res = await studentService.downloadDocument(studentId);

            const blob = new Blob([res.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const disposition = res.headers["content-disposition"];
            const fileNameMatch = disposition?.match(/filename="?(.+)"?/);
            const fileName = fileNameMatch?.[1] ||
                "verificatiosn_document.pdf";

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="text"
            disabled={loading}
            title="Download Verification PDF"
            onClick={handleDownload}
            className=''
        >
            {loading && <span className="ml-2">…</span>}
            {!loading && <ArrowDownToLine size={18} />}
        </Button>
    )
}
export default DownloadButton
