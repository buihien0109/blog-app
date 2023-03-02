import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useGetCategoiesQuery } from "../../app/services/category.api";

function TagList() {
    const { data: categories, isLoading } = useGetCategoiesQuery();

    if (isLoading) {
        return <h2>Loading ...</h2>;
    }
    return (
        <>
            <Helmet>
                <title>Danh mục</title>
            </Helmet>
            <main className="main">
                <header className="page-header">
                    <h1>Tags</h1>
                </header>
                <ul className="terms-tags">
                    {categories.map((c) => (
                        <li key={c.id}>
                            <Link to={`/tags/${c.name}`}>
                                {c.name}
                                <sup>
                                    <strong>
                                        <sup>{c.used}</sup>
                                    </strong>
                                </sup>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
}

export default TagList;
