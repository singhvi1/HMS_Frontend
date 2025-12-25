import { admin } from "../../../../data"
import AdminActions from "./adminActions"
import AdminHero from "./AdminHero"

const AdminHome = () => {
    console.log(admin)
    return (
        <section className="space-y-6">
            
            <AdminHero admin={admin} />
            <AdminActions/>
        </section>
    )
}

export default AdminHome
