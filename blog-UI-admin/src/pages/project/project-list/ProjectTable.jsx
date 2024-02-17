import { Table } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "../../../utils/functionUtils";
const columns = [
  {
    title: "Tên dự án",
    dataIndex: "title",
    key: "title",
    width: "35%",
    render: (text, record, index) => {
      return (
        <RouterLink to={`/admin/projects/${record.id}/detail`}>
          {text}
        </RouterLink>
      );
    },
  },
  {
    title: "Link github",
    dataIndex: "source",
    key: "source",
    width: "25%",
    render: (text, record, index) => {
      return (
        <a href={text} target="_blank">
          {text}
        </a>
      );
    },
  },
  {
    title: "Link demo",
    dataIndex: "link",
    key: "link",
    width: "25%",
    render: (text, record, index) => {
      return (
        <a href={text} target="_blank">
          {text}
        </a>
      );
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

const ProjectTable = ({ data }) => (
  <Table columns={columns} dataSource={data} rowKey={(record) => record.id} />
);
export default ProjectTable;
