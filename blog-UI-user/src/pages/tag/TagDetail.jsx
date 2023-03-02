import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useGetBlogsOfCategoryQuery } from "../../app/services/category.api";
import { formatDate } from "../../utils/functionUtils";

function TagDetail() {
    const { tagName } = useParams();
    const { data: blogs, isLoading } = useGetBlogsOfCategoryQuery(tagName);
    if (isLoading) {
        return <h2>Loading ...</h2>;
    }
    return (
        <>
            <Helmet>
                <title>Danh mục : {tagName}</title>
            </Helmet>
            <main className="main">
                <header className="entry-header">
                    <h1 style={{ marginBottom: 16 }}>Tag : {tagName}</h1>
                </header>
                {blogs.map((b) => (
                    <article key={b.id} className="post-entry">
                        <Link to={`/blogs/${b.id}/${b.slug}`}>
                            <header className="entry-header">
                                <h2>{b.title}</h2>
                            </header>
                            <div className="entry-content">
                                <p>{b.description}</p>
                            </div>
                            <footer className="entry-footer">
                                <span>{formatDate(b.publishedAt)}</span>
                            </footer>
                        </Link>
                    </article>
                ))}
            </main>
        </>
    );
}

export default TagDetail;
