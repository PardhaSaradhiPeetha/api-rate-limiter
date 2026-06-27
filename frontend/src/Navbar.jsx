import { NavLink, useNavigate } from "react-router-dom";
import { apiFetch } from "./utils/api.js";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const linkClass = ({ isActive }) =>
        `hover:text-blue-400 transition ${isActive ? "text-blue-400" : "text-gray-300"
        }`;

    const handleLogout = async () => {
        try {
            await apiFetch("/api/auth/logout", {
                method: "POST"
            });
        } catch {
            // ignore logout API errors and clear local state anyway
        }

        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="flex justify-between items-center px-8 py-5 border-b border-white/10 bg-slate-950 text-white sticky top-0 z-50">

            {/* LOGO */}
            <h2
                onClick={() => navigate("/")}
                className="text-xl font-bold tracking-wide cursor-pointer"
            >
                RateLimiter
            </h2>

            {/* LINKS */}
            <div className="space-x-6 text-sm flex items-center">

                {!token ? (
                    <>
                        <NavLink to="/login" className={linkClass}>
                            Login
                        </NavLink>

                        <NavLink to="/signup" className={linkClass}>
                            Sign Up
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/dashboard" className={linkClass}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/profile" className={linkClass}>
                            Profile
                        </NavLink>

                        <button
                            onClick={handleLogout}
                            className="hover:text-red-400 transition"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}