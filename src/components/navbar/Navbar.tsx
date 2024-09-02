import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import './Navbar.css';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { signInWithRedirect } from 'aws-amplify/auth';

const Navbar = () => {
    const { authStatus, signOut } = useAuthenticator();
    const isAuthenticated = authStatus === 'authenticated';

    const handleSignIn = () => {
        signInWithRedirect({
            provider: {
                custom: "auth0"
            }
        })
    }

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
                { isAuthenticated ? 
                    <>
                        <a href='/account' className='user-icon'>
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                        <button
                            className='signOut'
                            onClick={signOut}>
                            Sign out
                        </button>
                    </> :
                    <button
                        className='signIn'
                        onClick={handleSignIn}>
                        <FontAwesomeIcon icon={faDiscord} />
                        <span className='text'>Sign in</span>
                    </button>
                }
            </div>
        </nav>
    );
};

export default Navbar;