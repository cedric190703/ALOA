import React, {useState} from 'react';
import Logo from '../assets/logoAloa.jpg';
import {ItemNav} from '../utils/utils.ts';
import {NavLink} from 'react-router-dom';
import '../styles/login.css';

interface Props {
    items: ItemNav;
}

const Sidebar : React.FC<Props> = ({ items }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div>
            <button className="toggle-button" onClick={toggleSidebar}>
                <i className="fa fa-bars"></i>
            </button>
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-logo-container">
                    <img src={Logo} alt="logo" />
                    <p>Aloa</p>
                </div>

                <NavLink to="/home" className="sidebar-menu-item" id={items === ItemNav.Home ? 'chosen-item' : ''}>
                    <i className="fa fa-home"></i>
                    <span>Home</span>
                </NavLink>
                <NavLink to="/user" className="sidebar-menu-item" id={items === ItemNav.User ? 'chosen-item' : ''}>
                    <i className="fa fa-user"></i>
                    <span>Profile</span>
                </NavLink>
                <NavLink to="/patients" className="sidebar-menu-item" id={items === ItemNav.Patients ? 'chosen-item' : ''}>
                    <i className="fa fa-users"></i>
                    <span>Patients</span>
                </NavLink>
                <NavLink to="/appointment" className="sidebar-menu-item" id={items === ItemNav.Calendar ? 'chosen-item' : ''}>
                    <i className="fa fa-calendar"></i>
                    <span>Calendar</span>
                </NavLink>
                <NavLink to="/create" className="sidebar-menu-item" id={items === ItemNav.Create ? 'chosen-item' : ''}>
                    <i className="fa fa-plus"></i>
                    <span>Create</span>
                </NavLink>
                <NavLink to="/settings" className="sidebar-menu-item" id={items === ItemNav.Settings ? 'chosen-item' : ''}>
                    <i className="fa fa-cog"></i>
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;