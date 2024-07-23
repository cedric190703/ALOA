import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ItemNav} from "../utils/utils.ts";
import Sidebar from "./SideBar.tsx";
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext.tsx';
import axios from "axios";
import '../styles/profile.css';

function EditProfile() {
    const { user, setUser } = useUser();
    const [name, setName] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [isDoctor, setIsDoctor] = useState(user?.doctor);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleEdit = async (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                const userId = localStorage.getItem("userId");
                if (userId) {
                    const response = await axios.patch(`http://localhost:5050/record/user/update/${userId}`, {
                        email: email,
                        username: name,
                        doctor: isDoctor
                    }, {
                        withCredentials: true,
                    });

                    if (response.status === 200) {
                        setUser(response.data);
                    } else {
                        setError(response.data.message);
                    }
                } else {
                    setError('Edit fail. Please try again');
                }

            } catch (error) {
                console.error(error);
                setError('Edit fail. Please try again.');
            }
        }
        setValidated(true);
    };

    const getBack = () => {
        navigate(`/user`);
    }

    return (
        <div className="user-info-page">
            <button id='get-back' className="back-btn" onClick={getBack}>
                Back
            </button>
            <Sidebar items={ItemNav.User}/>
            <div className="create-user-container">
                <h1 className="create-user-title">Edit Profile</h1>
                <div className="create-user-form">
                    <Form noValidate validated={validated} onSubmit={handleEdit}>

                        <Form.Group controlId="formBasicText" className="item-create-user">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicMail" className="item-create-user">
                            <Form.Control
                                type="mail"
                                placeholder="Mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the mail.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox" className="item-create-user">
                            <Form.Check
                                type="checkbox"
                                label="Is Doctor"
                                checked={isDoctor}
                                onChange={(e) => setIsDoctor(e.target.checked)}
                            />
                        </Form.Group>

                        {error && <p className="error-message">{error}</p>}
                        <Button id="login-btn" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;