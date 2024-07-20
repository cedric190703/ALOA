import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem("token"); // Check if token cookie exists

    return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;