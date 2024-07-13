import React from 'react';
import { ItemNav } from '../utils/utils';
import Sidebar from '../organisms/SideBar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import testProfile from '../assets/pexels-tima-miroshnichenko-5452293.jpg';
import '../styles/profile.css';

// Example user data for the template of the frontend
const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    isDoctor: true,
    patients: 42,
    specialization: "brain surgery",
    profilePicture: testProfile
};

const UserInfo: React.FC = () => {
    return (
        <div className="user-info-page">
            <Sidebar items={ItemNav.User} />
            <div className="profile-card-container">
                <Card className="profile-card">
                    <Card.Img variant="top" src={user.profilePicture} className="profile-card-img" />
                    <Card.Body>
                        <Card.Title className="profile-card-title">{user.name}</Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {user.email}
                        </Card.Text>
                        <Card.Text>
                            <strong>Role:</strong> {user.isDoctor ? 'Doctor' : 'Patient'}
                        </Card.Text>
                        <Card.Text>
                            <strong>Number of patients:</strong> {user.patients}
                        </Card.Text>
                        <Card.Text>
                            <strong>specialization:</strong> {user.specialization}
                        </Card.Text>
                        <Button variant="primary" className="profile-edit-btn">Edit Profile</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default UserInfo;
