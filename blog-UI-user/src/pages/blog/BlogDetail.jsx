import React from "react";
import { Helmet } from "react-helmet";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useParams } from "react-router-dom";
import { useGetBlogDetailQuery } from "../../app/services/blog.api";
import ScrollButton from "../../components/scroll-button/ScrollButton";
import { formatDate } from "../../utils/functionUtils";

function BlogDetail() {
    const { blogId, blogSlug } = useParams();
    const { data: blog, isLoading } = useGetBlogDetailQuery({
        id: blogId,
        slug: blogSlug,
    });

    if (isLoading) {
        return <h2>Loading ...</h2>;
    }

    return (
        <>
            <Helmet>
                <title>{blog.title}</title>
            </Helmet>
            <main className="main">
                <article className="post-single">
                    <header className="post-header">
                        <h1 className="post-title">{blog.title}</h1>
                        <div className="post-meta">
                            <span>{formatDate(blog.publishedAt)}</span>
                        </div>
                    </header>
                    <div className="post-content">
                        <ReactMarkdown>{blog.content}</ReactMarkdown>
                    </div>
                </article>
            </main>

            <ScrollButton />
        </>
    );
}

export default BlogDetail;
