import React from "react";
import { Helmet } from "react-helmet";

function NotFound() {
    return (
        <>
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <div>NotFound</div>
        </>
    );
}

export default NotFound;
