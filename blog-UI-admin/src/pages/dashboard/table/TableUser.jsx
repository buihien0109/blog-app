import { Table, Avatar } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "../../../utils/functionUtils";

const columns = [
    {
        title: "Họ tên",
        dataIndex: "name",
        key: "name",
        render: (text, record, index) => {
            return (
                <RouterLink to={`/admin/users/${record.id}/detail`}>
                    {text}
                </RouterLink>
            );
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
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text, record, index) => {
            return formatDate(text);
        },
    },
];

function TableUser({ data }) {
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 5 }}
        />
    );
}

export default TableUser;
