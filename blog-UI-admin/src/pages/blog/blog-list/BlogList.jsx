import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Space, Spin, theme } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useGetBlogsQuery } from "../../../app/services/blogs.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import BlogTable from "./BlogTable";
import { Helmet } from "react-helmet";

const breadcrumb = [
    { label: "Danh sách bài viết", href: "/admin/blogs" },
]
const BlogList = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const {
        data,
        isLoading: isFetchingBlogs,
    } = useGetBlogsQuery();

    if (isFetchingBlogs) {
        return <Spin size="large" fullscreen />
    }

    return (
        <>
            <Helmet>
                <title>Danh sách bài viết</title>
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

                <BlogTable data={data} />
            </div>

        </>
    );
};

export default BlogList;
