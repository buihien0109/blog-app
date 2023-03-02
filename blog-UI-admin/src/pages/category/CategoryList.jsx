import React from "react";

function CategoryList() {
    return (
        <div className="container-fluid">
            <div className="row py-2">
                <div className="col-12">
                    <button type="button" className="btn btn-primary">
                        <i className="fas fa-plus"></i> Tạo danh mục
                    </button>
                    <button type="button" className="btn btn-info">
                        <i className="fas fa-redo"></i> Refresh
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Tên danh mục</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Java</td>
                                        <td>
                                            <button className="btn btn-info">
                                                Update
                                            </button>
                                            <button className="btn btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
