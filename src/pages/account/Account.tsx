import './Account.css';
import { Avatar, Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { useEffect, useState } from 'react';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import Grid from '@mui/material/Grid2';
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

    const getDateForCard = (date: string) => {
        const DateObj = new Date(date);
        const Day = DateObj.getUTCDate();
        const Month = Intl.DateTimeFormat('en', { month: 'long' }).format(DateObj);
        const Year = DateObj.getUTCFullYear();
        return `${Month} ${Day}, ${Year}`;
    }

    return (
        <div className="accountDetails">
            <main className='accountBody'>
                { authStatus === 'configuring' ? 
                    <>
                        <h1>Loading...</h1>
                    </> : authStatus === 'authenticated' && user ?
                    <>
                        { userProfile ?
                        <>
                            <Card sx={{ width: '60%', height: 'fit-content'}}>
                                <Box sx={{ flexGrow: 1, marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Grid container spacing={2} sx={{ display: 'flex', marginLeft: '5%', marginRight: '5%', paddingRight: '16px' }}>
                                        <Grid size={8}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar
                                                        alt="Avatar"
                                                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                                        sx={{ width: 56, height: 56}}
                                                    />
                                                }
                                                title={userProfile.username}
                                                subheader={userProfile.userId}
                                            />
                                        </Grid>
                                        <Grid size={4} container sx={{ alignContent: 'center', justifyContent: 'flex-end' }}>
                                            <Button disabled variant='contained'>
                                                <BuildCircleIcon />
                                                Edit Profile
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <CardContent sx={{ display: 'flex', width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                                    <Card sx={{ width: '28%', marginLeft: '5%', marginRight: '5%' }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar>
                                                    1
                                                </Avatar>
                                            }
                                            title="Join Date"
                                            subheader={getDateForCard(userProfile.createdAt)}
                                        />
                                    </Card>
                                    <Card sx={{ width: '28%', marginRight: '5%' }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar>
                                                    2
                                                </Avatar>
                                            }
                                            title="Placeholder"
                                            subheader="Placeholder"
                                        />
                                    </Card>
                                    <Card sx={{ width: '28%', marginRight: '5%' }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar>
                                                    3
                                                </Avatar>
                                            }
                                            title="Placeholder"
                                            subheader="Placeholder"
                                        />
                                    </Card>
                                </CardContent>
                            </Card>
                        </> : <h2>Loading...</h2>}
                    </> : null
                }
            </main>
        </div>
    );
};

export default Account;