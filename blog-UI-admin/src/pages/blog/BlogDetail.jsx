import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import SimpleMdeReact from "react-simplemde-editor";
import {
    useDeleteBlogMutation,
    useGetBlogByIdQuery,
    useUpdateBlogMutation,
} from "../../app/services/blogs.service";
import { useGetCategoriesQuery } from "../../app/services/categories.service";
import { useUploadImageMutation } from "../../app/services/images.service";

function BlogDetail() {
    const navigate = useNavigate();
    const { blogId } = useParams();
    const { data: blog, isLoading } = useGetBlogByIdQuery(blogId);
    const { data: categories } = useGetCategoriesQuery();
    const [uploadImage] = useUploadImageMutation();
    const [updateBlog] = useUpdateBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);
    const [categoryIds, setCategoryIds] = useState([]);
    const [thumbnail, setThumbnail] = useState("");

    const options =
        categories &&
        categories.map((c) => {
            return {
                value: c.id,
                label: c.name,
            };
        });

    const optionsSelected =
        options && options.filter((o) => categoryIds.includes(o.value));

    useEffect(() => {
        if (!blog) return;

        setTitle(blog.title);
        setContent(blog.content);
        setDescription(blog.description);
        setStatus(blog.status);
        setCategoryIds(blog.categories.map((b) => b.id));
        setThumbnail(blog.thumbnail);
    }, [blog]);

    const handleChangeCategory = (data) => {
        const ids = data.map((e) => e.value);
        setCategoryIds(ids);
    };

    const handleUploadThumbnail = (e) => {
        // Lấy ra file vừa được chọn
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        uploadImage(formData) // Trả về URL /api/images/1
            .unwrap()
            .then((res) => {
                setThumbnail(res.url);
                alert("Upload image thành công");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUpdateBlog = () => {
        const updatedBlog = {
            id: blogId,
            title,
            content,
            description,
            status,
            categoryIds,
            thumbnail,
        };

        updateBlog(updatedBlog)
            .unwrap()
            .then(() => {
                alert("Cập nhật blog thành công");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (isLoading) {
        return <h2>Loading ...</h2>;
    }

    return (
        <div className="container-fluid">
            <div className="row py-2">
                <div className="col-6">
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => navigate(-1)}
                    >
                        <i className="fas fa-chevron-left"></i> Quay lại
                    </button>
                    <button
                        type="button"
                        className="btn btn-info px-4"
                        onClick={handleUpdateBlog}
                    >
                        Lưu
                    </button>
                </div>

                <div className="col-6 d-flex justify-content-end">
                    <button type="button" className="btn btn-danger px-4">
                        Xóa
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label>Tiêu đề</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Nội dung</label>
                                        <SimpleMdeReact
                                            value={content}
                                            onChange={(value) =>
                                                setContent(value)
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Mô tả ngắn</label>
                                        <textarea
                                            id="description"
                                            className="form-control"
                                            rows="3"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Trạng thái</label>
                                        <select
                                            id="status"
                                            className="form-control"
                                            value={status ? "1" : "0"}
                                            onChange={(e) =>
                                                setStatus(
                                                    e.target.value === "0"
                                                        ? false
                                                        : true
                                                )
                                            }
                                        >
                                            <option value="0">Nháp</option>
                                            <option value="1">Công khai</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Danh mục</label>
                                        <div className="select2-purple">
                                            <Select
                                                options={options}
                                                value={optionsSelected}
                                                isMulti
                                                onChange={handleChangeCategory}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumbnail-preview-container mb-3">
                                            <img
                                                src={`http://localhost:8080${thumbnail}`}
                                                alt=""
                                                id="thumbnail"
                                            />
                                        </div>
                                        <label
                                            className="btn btn-info btn-flat"
                                            htmlFor="input-file"
                                        >
                                            Chọn hình ảnh
                                        </label>
                                        <input
                                            type="file"
                                            id="input-file"
                                            className="d-none"
                                            onChange={(e) =>
                                                handleUploadThumbnail(e)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
