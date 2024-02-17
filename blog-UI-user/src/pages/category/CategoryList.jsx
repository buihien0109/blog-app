import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useGetCategoiesQuery } from '../../app/services/category.api';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';

function CategoryList() {
    const { data: categories, isLoading, isError, error } = useGetCategoiesQuery();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error error={error} />;
    }

    return (
        <>
            <Helmet>
                <title>Danh mục</title>
            </Helmet>
            <div className="max-w-6xl mx-auto py-7">
                <h2 className="mb-0 text-lg font-semibold">Danh mục</h2>
                <ul className='flex items-center flex-wrap mt-6'>
                    {categories && categories.map((c) => (
                        <li key={c.id} className='me-6 mb-6 relative'>
                            <Link to={`/danh-muc/${c.slug}`} className='inline-block border border-gray-300 py-2 px-6 transition hover:bg-gray-800 hover:text-white hover:border-gray-800 rounded'>
                                {c.name}
                            </Link>
                            <div className='w-6 h-6 rounded-full absolute -top-3 -right-3 bg-gray-800 text-white flex justify-center items-center text-sm'>
                                <span>{c.used}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default CategoryList