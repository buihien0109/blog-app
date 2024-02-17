import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Space, Spin, theme } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useGetOwnBlogsQuery } from "../../../app/services/blogs.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import OwnBlogTable from "./OwnBlogTable";
import { Helmet } from "react-helmet";

const breadcrumb = [
    { label: "Danh sách bài viết", href: "/admin/blogs" },
    { label: "Bài viết của tôi", href: "/admin/blogs/own-blogs" },
]
const OwnBlogList = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const {
        data,
        isLoading: isFetchingBlogs,
    } = useGetOwnBlogsQuery();

    if (isFetchingBlogs) {
        return <Spin size="large" fullscreen />
    }

    return (
        <>
            <Helmet>
                <title>Bài viết của tôi</title>
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
                    <RouterLink to="/admin/blogs/own-blogs">
                        <Button style={{ backgroundColor: 'rgb(0, 192, 239)' }} type="primary" icon={<ReloadOutlined />}>
                            Refresh
                        </Button>
                    </RouterLink>
                </Space>

                <OwnBlogTable data={data} />
            </div>

        </>
    );
};

export default OwnBlogList;
