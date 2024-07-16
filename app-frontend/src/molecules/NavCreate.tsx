import { Nav } from 'react-bootstrap';
import '../styles/navcreate.css';

type NavCreateProps = {
    onSelect: (selectedKey: string | null) => void;
};

function NavCreate({ onSelect }: NavCreateProps) {
    return (
        <div className="nav-create-container">
            <Nav
                justify
                variant="tabs"
                defaultActiveKey="/home"
                onSelect={onSelect} // Handle tab selection
            >
                <Nav.Item>
                    <Nav.Link eventKey="create-user">Create user</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="create-appointment">Create appointment</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="create-medical-record">Create medical record</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default NavCreate;