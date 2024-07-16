import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState} from "react";
import '../styles/create.css';

function CreateUser() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [validated, setValidated] = useState(false);

    const handleCreateUser = (event: any) => {
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
        <div className="create-user-container">
            <h1 className="create-user-title">Create User</h1>
            <div className="create-user-form">
                <Form noValidate validated={validated} onSubmit={handleCreateUser}>
                    <Form.Group controlId="formBasicPassword" className="item-create-user">
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
                    <Form.Group controlId="formBasicEmail" className="item-create-user">
                        <Form.Control
                            type="email"
                            placeholder="Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button id="login-btn" type="submit">Create user</Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateUser;