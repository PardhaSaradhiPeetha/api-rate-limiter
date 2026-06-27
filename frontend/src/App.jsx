import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import LandingPage from './LandingPage.jsx';
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx"
import Dashboard from './Dashboard/Dashboard.jsx';
import Profile from "./Profile.jsx";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

function App() {

    const location = useLocation();

    const hideNavbar = ["/login", "/signup"].includes(location.pathname);

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Routes >
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes >
        </>
    );
}

export default App
