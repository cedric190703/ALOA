import React, {useEffect, useState} from 'react';
import Logo from '../assets/logoAloa.jpg';
import { ItemNav } from '../utils/utils.ts';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaUserFriends, FaCalendarAlt, FaBars } from "react-icons/fa";
import { IoIosCreate, IoMdSettings } from "react-icons/io";
import '../styles/login.css';

interface Props {
    items: ItemNav;
}

const Sidebar: React.FC<Props> = ({ items }) => {
    const [collapsed, setCollapsed] = useState(window.innerWidth <= 1000);

    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth <= 1000);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div>
            <button className="toggle-button" onClick={toggleSidebar}>
                <FaBars />
            </button>
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-logo-container">
                    <img src={Logo} alt="logo" />
                    {!collapsed && <p>Aloa</p>}
                </div>

                <NavLink to="/home" className="sidebar-menu-item" id={items === ItemNav.Home ? 'chosen-item' : ''}>
                    <FaHome className="icons-sidebar" />
                    {!collapsed && <span>Home</span>}
                </NavLink>
                <NavLink to="/user" className="sidebar-menu-item" id={items === ItemNav.User ? 'chosen-item' : ''}>
                    <FaUser className="icons-sidebar" />
                    {!collapsed && <span>Profile</span>}
                </NavLink>
                <NavLink to="/patients" className="sidebar-menu-item" id={items === ItemNav.Patients ? 'chosen-item' : ''}>
                    <FaUserFriends className="icons-sidebar" />
                    {!collapsed && <span>Patients</span>}
                </NavLink>
                <NavLink to="/appointment" className="sidebar-menu-item" id={items === ItemNav.Calendar ? 'chosen-item' : ''}>
                    <FaCalendarAlt className="icons-sidebar" />
                    {!collapsed && <span>Calendar</span>}
                </NavLink>
                <NavLink to="/create" className="sidebar-menu-item" id={items === ItemNav.Create ? 'chosen-item' : ''}>
                    <IoIosCreate className="icons-sidebar" />
                    {!collapsed && <span>Create</span>}
                </NavLink>
                <NavLink to="/settings" className="sidebar-menu-item" id={items === ItemNav.Settings ? 'chosen-item' : ''}>
                    <IoMdSettings className="icons-sidebar" />
                    {!collapsed && <span>Settings</span>}
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;