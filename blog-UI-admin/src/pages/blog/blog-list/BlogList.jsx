import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Space, theme } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import BlogTable from "./BlogTable";

const breadcrumb = [
    { label: "Danh sách bài viết", href: "/admin/blogs" },
]
const BlogList = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
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
                    <RouterLink to="/admin/blogs/create">
                        <Button style={{ backgroundColor: 'rgb(60, 141, 188)' }} type="primary" icon={<PlusOutlined />}>
                            Viết bài
                        </Button>
                    </RouterLink>
                    <RouterLink to="/admin/blogs">
                        <Button style={{ backgroundColor: 'rgb(0, 192, 239)' }} type="primary" icon={<ReloadOutlined />}>
                            Refresh
                        </Button>
                    </RouterLink>
                </Space>

                <BlogTable />
            </div>

        </>
    );
};

export default BlogList;
