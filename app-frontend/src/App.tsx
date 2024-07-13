import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LoadingPage from './pages/LoadingPage';
import SettingsPage from './pages/SettingsPage';
import CreatePage from './pages/CreatePage';
import AppointmentPage from './pages/AppointmentPage';
import PatientsPage from './pages/PatientsPage';
import NotFound from './pages/NotFound';
import SettingsItemPage from './organisms/SettingsItemPage';
import UserInfo from "./pages/UserInfo.tsx";
import EditProfile from "./organisms/EditProfile.tsx";

function App() {

    return (
        <div className={`${location.pathname === '/' ? 'Loading-background' : 'App' }`}>
            <Routes>
                <Route path="/" element={<LoadingPage />} />
                <Route path="/user" element={<UserInfo />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/edit" element={<EditProfile />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/appointment" element={<AppointmentPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/settings/:id" element={<SettingsItemPage />} />
            </Routes>
        </div>
    );
}

export default App
