import './Account.css';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { useState } from 'react';

const client = generateClient<Schema>();

const Account = () => {
    const { user, authStatus } = useAuthenticator((context) => [context.authStatus, context.user]);
    const [userProfile, setUserProfile] = useState<Schema["UserProfile"]["type"]>();

    const fetchUserProfile = async () => {
        if (user) {
            const { data: loadedUserProfile } = await client.models.UserProfile.get({
                id: user.userId
            });
            if (loadedUserProfile) {
                setUserProfile(loadedUserProfile);
            } else {
                const { data: createdUserProfile } = await client.models.UserProfile.create({
                    userId: user.userId,
                    username: user.username
                })
                if (createdUserProfile) {
                    setUserProfile(createdUserProfile);
                } else {
                    console.log("Failed to create profile.");
                }
            }
        }
    }

    fetchUserProfile();

    return (
        <div className="accountDetails">
            <main>
                <h1>Account Details Page WIP</h1>
                { authStatus === 'configuring' ? 
                    <>
                        <h1>Loading...</h1>
                    </> : authStatus === 'authenticated' && user ?
                    <>
                        { userProfile ?
                        <>
                            <h2>Hello {userProfile.username}</h2>
                            <p>UserId: {userProfile.userId}</p>
                        </> : <h2>Loading...</h2>}
                    </> : null
                }
            </main>
        </div>
    );
};

export default Account;