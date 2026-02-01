import { useState } from 'react'
import { ArrowDownToLine } from 'lucide-react';
import { excelService } from '../../../../services/apiService';
import Button from '../Button';
import { FILE_NAMES, TITLES } from '../../../../utils/constant';

const ExcelDownloadButton = ({ type }) => {

    const [loading, setLoading] = useState(false);


    const handleDownload = async () => {
        try {
            setLoading(true);

            const res = await excelService.getExcel(type);

            const blob = new Blob(
                [res.data],
                { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
            );

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download =
                FILE_NAMES[type] || "export.xlsx";

            document.body.appendChild(link);
            link.click();

            link.remove();
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
            title={TITLES[type]}
            onClick={handleDownload}
            className='my-2 px-3 py-1'
        >
            {loading && <span className="ml-2">…</span>}
            {!loading && <ArrowDownToLine size={20} />}
        </Button>
    )
}
export default ExcelDownloadButton