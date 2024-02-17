import React from 'react';

const Error = ({ error }) => {
    console.log(error);
    return (
        <div className="max-w-6xl mx-auto py-7">
            <div className="p-4 mb-4 text-gray-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <h2 className='text-2xl mb-2'>
                    <span>Oops, something went wrong!</span>
                </h2>
                {error && <p className='text-sm text-gray-500'>{error.data.message}</p>}
            </div>

        </div >
    );
};

export default Error