import React from "react";
import { formatDate } from "../../../utils/functionUtils";
import { Link } from "react-router-dom";

function OwnBlogTable({ blogs }) {
    return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Tiêu đề</th>
                    <th>Danh mục</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                </tr>
            </thead>
            <tbody>
                {blogs.length > 0 &&
                    blogs.map((b) => (
                        <tr key={b.id}>
                            <td>
                                <Link to={`/admin/blogs/${b.id}`}>
                                    {b.title}
                                </Link>
                            </td>
                            <td>
                                {b.categories.map((c) => c.name).join(", ")}
                            </td>
                            <td>{b.status ? "Công khai" : "Nháp"}</td>
                            <td>{formatDate(b.createdAt)}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default OwnBlogTable;
