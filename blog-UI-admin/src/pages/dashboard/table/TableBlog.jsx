import { Table, Tag } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "../../../utils/functionUtils";    

const columns = [
    {
        title: "Tiêu đề",
        dataIndex: "title",
        key: "title",
        width: "55%",
        render: (text, record, index) => {
            return (
                <RouterLink to={`/admin/blogs/${record.id}/detail`}>
                    {text}
                </RouterLink>
            );
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: "20%",
        render: (text, record, index) => {
            return text ? "Công khai" : "Nháp";
        },
    },
    {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "25%",
        render: (text, record, index) => {
            return formatDate(text);
        },
    },
];

function TableBlog({ data }) {
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 5 }}
        />
    );
}

export default TableBlog;
