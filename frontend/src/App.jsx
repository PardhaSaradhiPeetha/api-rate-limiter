import './App.css';
import LandingPage from './LandingPage.jsx';
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx"
import Dashboard from './Dashboard/Dashboard.jsx';
import ProfilePage from "./Profile.jsx";

function App() {
    return (
        <>  
            <LandingPage/>
            <LoginPage />
            <SignupPage/>
            <ProfilePage/>
            <Dashboard />
        </>
    );
}

export default App
