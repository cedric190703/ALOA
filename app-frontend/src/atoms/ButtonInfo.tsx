import infoLogo from '../assets/info-circle-svgrepo-com.svg';
import '../styles/patients.css';

interface Props {
    onClick?: () => void;
}

const ButtonInfo : React.FC<Props> = ({ onClick }) => {
    return (
        <div className="button-info">
            <button onClick={onClick}>
                <img src={infoLogo} alt="info logo" className="info-image" />
            </button>
        </div>
    )
}

export default ButtonInfo;
