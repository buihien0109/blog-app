import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Space, Spin, theme } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { useGetUsersQuery } from "../../../app/services/users.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import UserTable from "./UserTable";

const breadcrumb = [
  { label: "Danh sách user", href: "/admin/users" },
]
const UserList = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {
    data,
    isLoading: isFetchingUsers,
  } = useGetUsersQuery();

  if (isFetchingUsers) {
    return <Spin size="large" fullscreen />
  }

  return (
    <>
      <Helmet>
        <title>Danh sách user</title>
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
          <RouterLink to="/admin/users/create">
            <Button style={{ backgroundColor: 'rgb(60, 141, 188)' }} type="primary" icon={<PlusOutlined />}>
              Tạo user
            </Button>
          </RouterLink>
          <RouterLink to="/admin/users">
            <Button style={{ backgroundColor: 'rgb(0, 192, 239)' }} type="primary" icon={<ReloadOutlined />}>
              Refresh
            </Button>
          </RouterLink>
        </Space>

        <UserTable data={data} />
      </div>

    </>
  );
};

export default UserList;
