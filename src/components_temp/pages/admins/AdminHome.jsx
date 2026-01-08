import { admin } from "../../../../data.js"
import AdminHero from "./AdminHero.jsx"
import QuickActionsGrid from "../../common/QuickActionGrid.jsx"
import { adminActions } from "../../common/config.action.js"
const AdminHome = () => {
    return (
        <section className="space-y-6">

            <AdminHero admin={admin} />
            <QuickActionsGrid actions={adminActions} />
        </section>
    )
}

export default AdminHome
