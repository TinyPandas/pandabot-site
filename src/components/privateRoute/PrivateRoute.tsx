import { Navigate, useLocation } from 'react-router-dom';
import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react"

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props;
    const { authStatus } = useAuthenticator();
    const isLoggedIn = authStatus !== 'unauthenticated';
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