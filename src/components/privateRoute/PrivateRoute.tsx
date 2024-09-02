import { useAuthenticator } from "@aws-amplify/ui-react";
import React from "react";
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props;
    const { authStatus } = useAuthenticator();
    const isLoggedIn = authStatus === 'authenticated';
    const location = useLocation();

    return isLoggedIn ? (
        <>{children}</>
    ) : (
        <Navigate
            replace={true}
            to="/"
            state={{ from: `${location.pathname}${location.search}` }}
        />
    )
}

export default PrivateRoute;