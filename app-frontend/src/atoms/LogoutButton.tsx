import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import '../styles/logoutButton.css';

function LogoutButton() {
    const navigate = useNavigate();
    const handleGetBack = () => {
        navigate("/home");
    }

    return (
        <div className="button-back">
            <button onClick={handleGetBack} className="back-button">
                <IoIosLogOut className="icon-back"/>
                <span className="text-home-button">Log out</span>
            </button>
        </div>
    );
}

export default LogoutButton;