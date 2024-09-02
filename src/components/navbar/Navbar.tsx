import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className='logo'>
                    PandaBot
                </a>
            </div>
            <div className='navbar-center'>
                <ul className='nav-links'>
                    <li>
                        <a href='https://discord.gg/rsa'>Join our Discord</a>
                    </li>
                </ul>
            </div>
            <div className='navbar-right'>
                <a href='/account' className='user-icon'>
                    <FontAwesomeIcon icon={faUser} />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;