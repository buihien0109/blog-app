import { Table, Tag } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "../../../utils/functionUtils";
const columns = [
    {
        title: "Tiêu đề",
        dataIndex: "title",
        key: "title",
        render: (text, record, index) => {
            return (
                <RouterLink to={`/admin/blogs/${record.id}/detail`}>
                    {text}
                </RouterLink>
            );
        },
    },
    {
        title: "Danh mục",
        dataIndex: "categories",
        key: "categories",
        width: "20%",
        render: (text, record, index) => {
            return text.map((category) => (
                <Tag color={"geekblue"} key={category.id} style={{ marginBottom: 7 }}>
                    {category.name.toUpperCase()}
                </Tag>
            ));
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: "10%",
        render: (text, record, index) => {
            return text ? "Công khai" : "Nháp";
        },
    },
    {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "15%",
        render: (text, record, index) => {
            return formatDate(text);
        },
    },
];

const OwnBlogTable = ({ data }) => (
    <Table columns={columns} dataSource={data} rowKey={(record) => record.id} />
);
export default OwnBlogTable;
