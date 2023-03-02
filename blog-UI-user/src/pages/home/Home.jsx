import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../app/services/blog.api";
import { useGetTop5CategoriesQuery } from "../../app/services/category.api";
import { formatDate } from "../../utils/functionUtils";

function Home() {
    const { data: blogs, isLoading: isLoadingBlog } = useGetBlogsQuery();
    const { data: categories, isLoading: isLoadingCategory } =
        useGetTop5CategoriesQuery();

    if (isLoadingBlog || isLoadingCategory) {
        return <h2>Loading ...</h2>;
    }
    return (
        <>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <main className="main">
                <header className="entry-header">
                    <h1>
                        <span
                            style={{
                                display: "inline-block",
                                transform: "rotateY(180deg)",
                            }}
                        >
                            🐈
                        </span>{" "}
                        Blog app <span>🐈</span>
                    </h1>
                </header>
                <ul className="terms-tags top-tags">
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

export default Home;
