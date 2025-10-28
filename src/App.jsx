// frontend/src/App.jsx - FIXED FOR 2 USER TYPES
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './hooks/useAuth';
import { UserProvider } from './context/UserContext';


// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import Home from './pages/Home';
import UnifiedAuth from './pages/Login';
import Signup from './pages/Signup';
import Listings from './pages/Listings';
import PendingApproval from './pages/PendingApproval';
import PropertyDetails from './pages/PropertyDetails';

// ============================================
// NEW: 2 USER TYPE SIGNUP FLOW
// ============================================
import RoleSelection from './pages/RoleSelection';
import ProviderTypeSelection from './pages/ProviderTypeSelection';

// Seeker Signup (1 type)
import SeekerSignup from './pages/SeekerSignup';

// Provider Signups (3 subtypes)
import ProviderOwnerSignup from './pages/ProviderOwnerSignup';
import ProviderAgentSignup from './pages/ProviderAgentSignup';
import ProviderBuilderSignup from './pages/ProviderBuilderSignup';

// Protected Pages (TODO - You'll create these next)
// import PropertyDetails from './pages/PropertyDetails';
// import PostProperty from './pages/PostProperty';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
// import MyProperties from './pages/MyProperties';

// Admin Pages (TODO)
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminUsers from './pages/admin/AdminUsers';
// import AdminProperties from './pages/admin/AdminProperties';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                {/* ========================================== */}
                {/* PUBLIC ROUTES */}
                {/* ========================================== */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<UnifiedAuth />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/pending-approval" element={<PendingApproval />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                
                
                {/* Step 1: Redirect to role selection */}
                <Route path="/signup" element={<Signup />} />
                
                {/* Step 2: Choose Seeker or Provider */}
                <Route path="/signup/role-selection" element={<RoleSelection />} />
                
                {/* Step 3A: Seeker Signup (Direct) */}
                <Route path="/signup/seeker" element={<SeekerSignup />} />
                
                {/* Step 3B: Provider Type Selection (Owner/Agent/Builder) */}
                <Route path="/signup/provider-type" element={<ProviderTypeSelection />} />
                
                {/* Step 3C: Provider Signups (3 subtypes) */}
                <Route path="/signup/provider/owner" element={<ProviderOwnerSignup />} />
                <Route path="/signup/provider/agent" element={<ProviderAgentSignup />} />
                <Route path="/signup/provider/builder" element={<ProviderBuilderSignup />} />
                
               <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
                
                {/* 404 Page */}
                <Route path="*" element={
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                      <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Go Home
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            </main>

            <Footer />
            <ToastContainer 
              position="bottom-right" 
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;