import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div className="text-center p-4">جارٍ التحقق من الهوية...</div>;
    }

    if (!user) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default ProtectedRoute;
