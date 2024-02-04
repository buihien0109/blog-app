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
            return <RouterLink to={`/admin/blogs/${record.id}/detail`}>{text}</RouterLink>;
        },
    },
    {
        title: "Danh mục",
        dataIndex: "categories",
        key: "categories",
        render: (text, record, index) => {
            return text.map((category) => (
                <Tag color={"geekblue"} key={category.id}>
                    {category.name.toUpperCase()}
                </Tag>
            ));
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (text, record, index) => {
            return text ? "Công khai" : "Nháp";
        },
    },
    {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text, record, index) => {
            return formatDate(text);
        },
    },
];
const data = [
    {
        key: "1",
        id: 1,
        title: "Học lập trình như thế nào?",
        author: {
            id: 1,
            name: "Bùi Hiên",
        },
        categories: [
            {
                id: 1,
                name: "Lập trình",
            },
            {
                id: 2,
                name: "ReactJS",
            },
        ],
        status: true,
        createdAt: new Date("2024-02-03 16:08:23.158354"),
    },
    {
        key: "2",
        id: 2,
        title: "Các kỹ thuật khác nhau để bảo mật dữ liệu riêng tư trong iOS swift",
        author: {
            id: 2,
            name: "Minh Duy",
        },
        categories: [
            {
                id: 3,
                name: "IOS",
            },
            {
                id: 4,
                name: "Database",
            },
        ],
        status: false,
        createdAt: new Date("2024-02-03 16:08:23.158354"),
    },
    {
        key: "3",
        id: 3,
        title: "Thiết kế Kiến trúc Microservices với Spring đơn giản",
        author: {
            id: 3,
            name: "Thu Hằng",
        },
        categories: [
            {
                id: 5,
                name: "SpringBoot",
            },
            {
                id: 6,
                name: "Backend",
            },
            {
                id: 7,
                name: "Java",
            },
        ],
        status: true,
        createdAt: new Date("2024-02-03 16:08:23.158354"),
    },
];
const OwnBlogTable = () => <Table columns={columns} dataSource={data} />;
export default OwnBlogTable;
