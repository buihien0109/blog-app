import { Table } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "../../../utils/functionUtils";

const columns = [
    {
        title: "User",
        dataIndex: "user",
        key: "user",
        width: "20%",
        render: (text, record, index) => {
            return (
                <RouterLink to={`/admin/users/${text.id}/detail`}>
                    {text.name}
                </RouterLink>
            )
        },
    },
    {
        title: "Nội dung",
        dataIndex: "content",
        key: "content",
        width: "65%",
        render: (text, record, index) => {
            return text
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

function TableCommet({ data }) {
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 5 }}
        />
    );
}

export default TableCommet;
