import Spinner from 'react-bootstrap/Spinner';
import Logo from '../assets/logoAloa.jpg';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import '../styles/loading.css';

function LoadingPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadElements  = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setLoading(false);
        }

        loadElements();
    }, []);

    // Go to the home page after 3s
    useEffect(() => {
        if (!loading)
        {
            navigate('/login');
        }
    }, [loading, navigate]);

    return (
        <div className="loading-page">
            <div className="logo-aloa-loading">
                <img src={Logo} alt="logo"/>
            </div>
            <div className="logo-name">
                <h2>
                    Aloa
                </h2>
            </div>
            <Spinner animation="border" role="status" variant="primary" id="spinner" />
            <div className="span-logo">
                <h6>Session loading</h6>
            </div>
        </div>
    )
}

export default LoadingPage;