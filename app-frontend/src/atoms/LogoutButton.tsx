import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import '../styles/logoutButton.css';
import {useState} from "react";
import axios from "axios";

function LogoutButton() {
    const navigate = useNavigate();
    const [error, setError] = useState<String>('');

    const handleLoggout = async () => {
        localStorage.removeItem('dark');
        try {
            const response = await axios.post('http://localhost:5050/record/logout', {}, {
                withCredentials: true,
            });

            // Assuming the backend sends a success message
            if (response.status === 200) {
                setError('');
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                navigate('/login');
            } else {
                setError("Error: Logout failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setError("Error: An error occurred while logging out.");
        }
    }

    return (
        <div className="button-back">
            <button onClick={handleLoggout} className="back-button">
                <IoIosLogOut className="icon-back"/>
                <span className="text-home-button">Log out</span>
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default LogoutButton;