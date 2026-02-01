import React from 'react'
import ExcelDownloadButton from '../../common/ui/downloadbutton/ExcelDownloadButton'

const AccountantDashBoard = () => {

    return (
        <div>
            <h1 className='flex min-h-screen items-center justify-center text-2xl'>Accountant Dashboard <ExcelDownloadButton type={"accountant"}/></h1>

        </div>
    )
}

export default AccountantDashBoard
