import React from 'react'
import Header from './Header'
import RoomTable from './RoomTable'
import VerificationRequestTable from './VerificationRequestTable'

const AdminALlotment = () => {
    return (
        <>
            <div className="w-full bg-gray-50 min-h-screen">

                <Header />
                <div className="py-6">
                    <VerificationRequestTable />
                    {/* <RoomTable /> */}

                </div>

            </div>

        </>
    )
}

export default AdminALlotment
