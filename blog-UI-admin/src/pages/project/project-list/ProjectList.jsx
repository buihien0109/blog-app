import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Space, Spin, theme } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useGetProjectsQuery } from "../../../app/services/projects.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import ProjectTable from "./ProjectTable";
import { Helmet } from "react-helmet";

const breadcrumb = [
  { label: "Danh sách project", href: "/admin/projects" },
]
const ProjectList = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {
    data,
    isLoading: isFetchingProjects,
  } = useGetProjectsQuery();

  if (isFetchingProjects) {
    return <Spin size="large" fullscreen />
  }

  return (
    <>
      <Helmet>
        <title>Danh sách project</title>
      </Helmet>
      <AppBreadCrumb items={breadcrumb} />
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Space style={{ marginBottom: '1rem' }}>
          <RouterLink to="/admin/projects/create">
            <Button style={{ backgroundColor: 'rgb(60, 141, 188)' }} type="primary" icon={<PlusOutlined />}>
              Tạo project
            </Button>
          </RouterLink>
          <RouterLink to="/admin/projects">
            <Button style={{ backgroundColor: 'rgb(0, 192, 239)' }} type="primary" icon={<ReloadOutlined />}>
              Refresh
            </Button>
          </RouterLink>
        </Space>

        <ProjectTable data={data} />
      </div>

    </>
  );
};

export default ProjectList;
