import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { signInWithRedirect } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Navbar = () => {
    const { authStatus, signOut } = useAuthenticator((context) => [context.user]);
    const isAuthenticated = authStatus === 'authenticated';

    const handleSignIn = () => {
        signInWithRedirect({
            provider: {
                custom: "auth0"
            }
        });
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