import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useLazySearchBlogQuery } from "../../app/services/blog.api";

function Search() {
    const [searchBlog, { data: blogs }] = useLazySearchBlogQuery();

    const schema = yup
        .object({
            term: yup.string().required("Từ khóa không được để trống"),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: yupResolver(schema),
    });

    const onSubmit = async ({ term }) => {
        try {
            await searchBlog(term);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Tìm kiếm</title>
            </Helmet>
            <main className="main">
                <header className="page-header">
                    <h1>Search</h1>
                    <div className="post-description">Tìm kiếm bài viết</div>
                    <div className="post-meta"></div>
                </header>
                <div id="searchbox">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            id="searchInput"
                            placeholder="Tìm kiếm bài viết"
                            autoComplete="off"
                            {...register("term")}
                        />
                        <span
                            style={{
                                color: "#f44336",
                                fontSize: 14,
                                minHeight: 20,
                                display: "block",
                                minWidth: "100%",
                            }}
                        >
                            {errors.term?.message}
                        </span>
                    </form>

                    <ul id="searchResults">
                        {blogs &&
                            blogs.length > 0 &&
                            blogs.map((b) => (
                                <li key={b.id} className="post-entry">
                                    <header className="entry-header">
                                        {b.title}
                                    </header>
                                    <a
                                        href={`/blogs/${b.id}/${b.slug}`}
                                        aria-label={b.title}
                                    ></a>
                                </li>
                            ))}
                        {blogs && blogs.length === 0 && (
                            <li className="post-entry">Không tìm thấy blog</li>
                        )}
                    </ul>
                </div>
            </main>
        </>
    );
}

export default Search;
