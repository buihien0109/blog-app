import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <div class="h-96 flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <h class="text-3xl font-bold text-gray-800 mb-4">404 - Page Not Found</h>
                    <p class="text-lg text-gray-600 mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
                    <Link to={"/"} class="rounded border bg-gray-800 text-white border-gray-800 py-2 pl-4 pr-6 transition-all hover:bg-white hover:text-gray-800">Go to Home</Link>
                </div>
            </div>
        </>
    );
}

export default NotFound;
