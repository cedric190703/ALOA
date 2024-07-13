import { useState } from 'react';
import Logo from '../assets/logoAloa.jpg';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/login.css';

function SignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isDoctor, setIsDoctor] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleSignup = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false || password !== confirmPassword) {
            event.stopPropagation();
        } else {
            // TODO: connect to the backend
        }
        setValidated(true);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="login-form">
                <h1>Welcome</h1>
                <p>Create an account to continue</p>
                <Form noValidate validated={validated} onSubmit={handleSignup}>
                    <Form.Group controlId="formBasicEmail">
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
                    <Form.Group controlId="formBasicUsername">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter your password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {password !== confirmPassword ? "Passwords do not match." : "Please confirm your password."}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicIsDoctor">
                        <Form.Check
                            type="checkbox"
                            label="I am a doctor"
                            checked={isDoctor}
                            onChange={(e) => setIsDoctor(e.target.checked)}
                        />
                    </Form.Group>
                    <a href="/forgot-password">forgot your password?</a>
                    <Button id="login-btn" type="submit" onClick={handleSignup}>Signup</Button>
                </Form>
                <div className="bottom-form-login">
                    <p>You have an account?</p>
                    <Button id="signup-btn" onClick={handleLogin}>Log in</Button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;