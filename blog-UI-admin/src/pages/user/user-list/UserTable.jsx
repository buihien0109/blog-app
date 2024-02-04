import { Avatar, Table, Tag } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "../../../utils/functionUtils";
const columns = [
    {
        title: "Avatar",
        dataIndex: "avatar",
        key: "avatar",
        render: (text, record, index) => {
            return <Avatar size={64} src={<img src={text} alt="avatar" />} />;
        },
    },
    {
        title: "Họ tên",
        dataIndex: "name",
        key: "name",
        render: (text, record, index) => {
            return <RouterLink to={`/admin/users/${record.id}/detail`}>{text}</RouterLink>;
        },
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text, record, index) => {
            return text;
        },
    },
    {
        title: "Quyền",
        dataIndex: "role",
        key: "role",
        render: (text, record, index) => {
            return (
                <Tag color={record.role == "ADMIN" ? "geekblue" : "volcano"}>
                    {text.toUpperCase()}
                </Tag>
            )
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

const UserTable = ({data}) => <Table columns={columns} dataSource={data} rowKey={(record) => record.id}/>;
export default UserTable;
