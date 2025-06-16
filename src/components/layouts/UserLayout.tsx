// components/layouts/UserLayout.tsx
import UserNavbar from "../UserNavbar";
import UserSidebar from "../UserSidebar";

const UserLayout = ({ children }) => (
  <div className="flex">
    <UserSidebar />
    <div className="flex-1">
      <UserNavbar />
      <main>{children}</main>
    </div>
  </div>
);

export default UserLayout;
