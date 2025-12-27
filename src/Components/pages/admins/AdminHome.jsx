import { admin } from "../../../../data"
import { QuickActionsGrid ,AdminHero } from "../../index.js"
import { adminActions } from "../../common/config.action.js"
const AdminHome = () => {
    // console.log("admin",admin)
    return (
        <section className="space-y-6">

            <AdminHero admin={admin} />
            <QuickActionsGrid actions={adminActions} />
        </section>
    )
}

export default AdminHome
