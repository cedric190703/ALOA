import React, { useEffect, useState } from 'react';
import { ItemNav } from '../utils/utils';
import Sidebar from '../organisms/SideBar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import testProfile from '../assets/pexels-tima-miroshnichenko-5452293.jpg';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/profile.css';

const Profile: React.FC = () => {
    const { user } = useUser(); // Use the user from context
    const [date, setDate] = useState<Date | null>(null);
    const navigate = useNavigate();

    const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
    document.body.style.backgroundColor = dark ? "#000000" : "#FFFFFF";

    useEffect(() => {
        if (user && user.createdAt) {
            setDate(new Date(user.createdAt));
        }
    }, [user]);

    const handleEditProfile = () => {
        navigate("/profile/editProfile");
    };

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (!user) {
        return (
            <div className="user-info-page">
                <Sidebar items={ItemNav.User}/>
                <h1>Loading ...</h1>
            </div>
        );
    }

    return (
        <div className="user-info-page" style={{ backgroundColor : dark ? 'black' : 'white' }}>
            <Sidebar items={ItemNav.User} />
            <div className="profile-card-container" style={{ backgroundColor : dark ? 'black' : 'white' }}>
                <Card className="profile-card" style={{ backgroundColor : dark ? 'black' : 'white', color : dark ? 'white' : 'black' }}>
                    <Card.Img
                        variant="top"
                        src={testProfile}
                        className="profile-card-img"
                    />
                    <Card.Body>
                        <Card.Title className="profile-card-title">Username: {user.username}</Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {user.email}
                        </Card.Text>
                        <Card.Text>
                            <strong>Role:</strong> {user.doctor ? 'Doctor' : 'Patient'}
                        </Card.Text>
                        <Card.Text>
                            <strong>Created at:</strong> {date ? date.toLocaleDateString("en-US", options) : 'N/A'}
                        </Card.Text>
                        <Button
                            variant="primary"
                            onClick={handleEditProfile}
                            className="profile-edit-btn"
                        >
                            Edit Profile
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Profile;