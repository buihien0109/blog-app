import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [pages, setPages] = useState([]);

    // Generate an array of page numbers based on the total number of pages
    useState(() => {
        const tempPages = [];
        for (let i = 1; i <= totalPages; i++) {
            tempPages.push(i);
        }
        setPages(tempPages);
    }, [totalPages]);

    return (
        <div className="flex justify-center items-center my-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`mx-1 relative inline-flex items-center px-2 py-2 rounded border border-gray-800 text-sm font-medium text-gray-800 transition-all hover:bg-gray-800 hover:text-white ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 mr-1" /> Previous
            </button>
            <div className="hidden sm:block">
                <div className="relative z-0 inline-flex shadow-sm rounded-md">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`mx-1 relative inline-flex items-center px-4 py-2 rounded  text-sm font-medium transition-all hover:bg-gray-800 hover:text-white ${currentPage === page ? 'bg-gray-800 text-white' : 'border border-gray-800 text-gray-800'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`mx-1 relative inline-flex items-center px-2 py-2 rounded border border-gray-800 text-sm font-medium text-gray-800 transition-all hover:bg-gray-800 hover:text-white ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
            >
                Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4 ml-1" />
            </button>
        </div>
    );
};

export default Pagination;
