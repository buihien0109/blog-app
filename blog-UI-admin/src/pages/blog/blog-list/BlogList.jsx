import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../../app/services/blogs.service";
import BlogTable from "./BlogTable";

function BlogList() {
    const { data, isLoading, isError } = useGetBlogsQuery();

    // Số lượng item trên 1 trang
    const itemsPerPage = 10;

    // Vị trí bắt đầu
    const [itemOffset, setItemOffset] = useState(0);

    if (isLoading) {
        return <h2>Loading ...</h2>;
    }

    if (isError) {
        return <h2>Có lỗi xảy ra</h2>;
    }

    // Vị trí kết thúc
    const endOffset = itemOffset + itemsPerPage;

    // Các phần tử từ vị trí bắt đầu => kết thúc
    const currentItems = data.slice(itemOffset, endOffset);

    // Tổng số trang
    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Xử lý sự kiện khi bấm vào nút chuyển trang
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="container-fluid">
            <div className="row py-2">
                <div className="col-12">
                    <Link
                        to={"/admin/blogs/create"}
                        className="btn btn-primary"
                    >
                        <i className="fas fa-plus"></i> Viết bài
                    </Link>
                    <Link to={"/admin/blogs"} className="btn btn-info">
                        <i className="fas fa-redo"></i> Refresh
                    </Link>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <BlogTable blogs={currentItems} />
                            <div
                                className="d-flex justify-content-center mt-3"
                                id="pagination"
                            >
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={pageCount}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                    // initialPage={2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogList;
