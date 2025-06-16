// components/layouts/AdminLayout.tsx
import AdminNavbar from "../Navbar";
import AdminSidebar from "../Sidebar";

const AdminLayout = ({ children }) => (
  <div className="flex">
    <AdminSidebar />
    <div className="flex-1">
      <AdminNavbar />
      <main>{children}</main>
    </div>
  </div>
);

export default AdminLayout;
