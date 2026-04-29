import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import GetTenants from "./pages/getTenants"
import AddProperty from "./pages/AddProperty"
import TenantLayout from "./pages/TenantLayout"
import AddMember from "./pages/AddMember"
import AddContact from "./pages/AddContact"
import GetProperties from "./pages/GetProperties"
import GetMembers from "./pages/GetMembers"
import GetContacts from "./pages/GetContacts"
import AddTenants from "./pages/AddTenant"
import Dashboard from "./pages/Dashboard"
import ViewProperty from "./pages/ViewProperty"
import SubscriptionPlan from "./pages/SubscriptionPlans"
import CheckOut from "./pages/CheckOut"


function Routers() {
    return (
        <>
            <Routes>
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tenants" element={<GetTenants />} />
                <Route path="/addTenantWorkspace" element={<AddTenants />} />

                <Route path="/tenant/:tenantId" element={<TenantLayout />}>
                    <Route path="dashboard/stats" element={<Dashboard />} />
                    <Route path="properties/new" element={<AddProperty />} />
                    <Route path="contacts/new" element={<AddContact />} />
                    <Route path="properties" element={<GetProperties />} />
                    <Route path="edit/properties/:id" element={<AddProperty />} />
                    <Route path="members/new" element={<AddMember />} />
                    <Route path="members" element={<GetMembers />} />
                    <Route path="edit/member/:id" element={<AddMember />} />
                    <Route path="contacts" element={<GetContacts />} />
                    <Route path="viewProperty/:id" element={<ViewProperty />} />
                    <Route path="subscription/menu" element={<SubscriptionPlan />} />
                    <Route path="checkOut/subscription" element={<CheckOut />} />
                </Route>

            </Routes>
        </>
    )
}

export default Routers; 