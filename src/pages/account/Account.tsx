import './Account.css';
import { useEffect, useState } from 'react';
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

const Account = () => {
    const { user, authStatus } = useAuthenticator((context) => [context.authStatus, context.user]);
    const [userProfile, setUserProfile] = useState<Schema["UserProfile"]["type"]>();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const { data: allProfiles } = await client.models.UserProfile.list();
                const matchedProfile = allProfiles.filter(profile => profile.userId === user.userId);
    
                if (matchedProfile.length > 0) {
                    const loadedProfile = matchedProfile[0];
                    console.log(`Loaded profile: ${loadedProfile}`);
                    setUserProfile(loadedProfile);
                } else {
                    console.log("Creating user profile.");
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
        };
        fetchUserProfile();
    }, [user]);

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