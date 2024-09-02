import './Account.css';
import { useAuthenticator } from "@aws-amplify/ui-react";

const Account = () => {
    const { user, authStatus } = useAuthenticator((context) => [context.authStatus, context.user]);

    return (
        <div className="accountDetails">
            <main>
                <h1>Account Details Page WIP</h1>
                { authStatus === 'configuring' ? 
                    <>
                        <h1>Loading...</h1>
                    </> : authStatus === 'authenticated' && user ?
                    <>
                        <h2>Hello {user.username}</h2>
                        <p>UserId: {user.userId}</p>
                    </> : null
                }
            </main>
        </div>
    );
};

export default Account;