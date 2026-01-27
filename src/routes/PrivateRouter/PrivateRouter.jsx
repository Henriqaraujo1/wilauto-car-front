import NavBar from "../../components/NavBar/Navbar";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = ({ children, requiredPermissions }) => {
  const infoAuth = useSelector((state) => state.persisted.auth);

  if (!infoAuth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  const hasPermission = requiredPermissions.some((permission) =>
    infoAuth.permissions.includes(permission)
  );
  
  return (
    <>
      <NavBar />
      {hasPermission ? (
        children
      ) : (
        <Navigate to="/not-permission" state={{ infoAuth }} />
      )}
    </>
  );
};

export default PrivateRouter;
