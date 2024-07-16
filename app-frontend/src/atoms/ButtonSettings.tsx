import React from "react";
import { CiLight } from "react-icons/ci";
import {SettingsType} from '../utils/utils.ts';
import { FaCircleInfo } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import '../styles/settings.css';

interface Props {
    title: string,
    description: string,
    id: number,
    type: SettingsType,
    onClickSettingsItem: (id: number) => void;
}

const ButtonSettings : React.FC<Props> = ({
                                                 id,
                                                 title,
                                                 description,
                                                 type,
                                                 onClickSettingsItem,
                                             }) => {
    return (
        <div className="settings-modules" onClick={() => onClickSettingsItem(id)}>
            {type === SettingsType.Light && (
                <CiLight />
            )}

            {type === SettingsType.Logout && (
                <IoIosLogOut />
            )}

            {type === SettingsType.Security && (
                <MdOutlineSecurity />
            )}

            {type === SettingsType.AboutUs && (
                <FaCircleInfo />
            )}

            <div className="content">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div className="right-arrows">
                <span>&#8614;</span>
            </div>
        </div>
    );
}

export default ButtonSettings;