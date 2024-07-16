import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ItemNav} from "../utils/utils.ts";
import Sidebar from "./SideBar.tsx";
import '../styles/profile.css';

function EditProfile() {
    const [age, setAge] = useState('42');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isDoctor, setIsDoctor] = useState<boolean>(false);
    const [validated, setValidated] = useState(false);

    const handleEdit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // TODO: connect to the backend : create a user
        }
        setValidated(true);
    };

    return (
        <div className="edit-profile-container">
            <Sidebar items={ItemNav.User} />
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

                        <Form.Group controlId="formBasicText" className="item-create-user">
                            <Form.Control
                                type="text"
                                placeholder="Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the age.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button id="login-btn" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;