import React from "react";
import ButtonSettings from '../atoms/ButtonSettings';
import {SettingsType} from '../utils/utils.ts';
import {useNavigate} from "react-router-dom";
import '../styles/settings.css';

const SettingsModule : React.FC = () => {
    const navigate = useNavigate();

    const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
    document.body.style.backgroundColor = dark ? "#000000" : "#FFFFFF";

    const allSettings = [
        {
            id: 1,
            title: "Luminosity",
            description: "Set the application's mode",
            Icon: SettingsType.Light
        },
        {
            id: 2,
            title: "Logout",
            description: "Logout from the application",
            Icon: SettingsType.Logout
        },
        {
            id: 3,
            title: "Security",
            description: "Security and privacy",
            Icon: SettingsType.Security
        },
        {
            id: 4,
            title: "About",
            description: "Find more about the application",
            Icon: SettingsType.AboutUs
        }
    ];

    const handleClickSettingsItem = (id: number) => {
        navigate(`/settings/${id}`);
    }

    return (
        <div className="settings-container" style={{ backgroundColor: dark ? "#000000" : "#fff" }}>
            <ul className="settings-grid">
                {allSettings.map(doc => (
                    <li key={doc.id}>
                        <ButtonSettings
                            id={doc.id}
                            title={doc.title}
                            description={doc.description}
                            type={doc.Icon}
                            onClickSettingsItem={handleClickSettingsItem}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SettingsModule;
