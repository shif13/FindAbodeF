// frontend/src/components/PrivateRoute.jsx - FIXED
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Changed from currentUser to user

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Check if user is logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;