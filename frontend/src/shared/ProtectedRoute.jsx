import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.auth);
    if (!user.admin) {
        return <Navigate to="/userhome" />;
    }
    return children;
}
