import { useState } from 'react';
import Logo from '../assets/logoAloa.jpg';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/login.css';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);

    const handleLogin = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // TODO: connect to the backend
        }
        setValidated(true);
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="login-form">
                <h1>Welcome</h1>
                <p>Login to your account to continue</p>
                <Form noValidate validated={validated} onSubmit={handleLogin}>
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
                    <a href="/forgot-password">forgot your password?</a>
                    <Button id="login-btn" type="submit">Log in</Button>
                </Form>
                <div className="bottom-form-login">
                    <p>Don't have an account?</p>
                    <Button id="signup-btn" onClick={handleSignup}>Signup</Button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;