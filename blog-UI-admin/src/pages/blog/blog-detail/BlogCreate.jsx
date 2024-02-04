import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space, theme } from "antd";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";

const breadcrumb = [
    { label: "Danh sách bài viết", href: "/admin/blogs" },
    { label: "Tạo bài viết", href: "/admin/blogs/create" },
];
const BlogCreate = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();

    const handleCreate = async () => {
        try {
            // Validate fields
            const values = await form.validateFields();
            console.log("Form data values:", values);

            // TODO: Gửi dữ liệu lên server
        } catch (error) {
            // Handle validation error
            console.error("Validation failed:", error);
        }
    };

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
                <Space style={{ marginBottom: "1rem" }}>
                    <RouterLink to="/admin/blogs">
                        <Button type="default" icon={<LeftOutlined />}>
                            Quay lại
                        </Button>
                    </RouterLink>
                    <Button
                        style={{ backgroundColor: "rgb(60, 141, 188)" }}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreate}
                    >
                        Tạo bài viết
                    </Button>
                </Space>

                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ status: false }}
                >
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item
                                label="Tiêu đề"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tiêu đề không được để trống!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter title" />
                            </Form.Item>

                            <Form.Item
                                label="Nội dung"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Nội dung không được để trống!",
                                    },
                                ]}
                            >
                                <SimpleMDE />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Mô tả không được để trống!",
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="Enter description" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Trạng thái"
                                name="status"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Trạng thái không được để trống!",
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    options={[
                                        { label: "Nháp", value: false },
                                        { label: "Công khai", value: true },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item label="Danh mục" name="categoryIds">
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    options={[
                                        { label: "ReactJS", value: 1 },
                                        { label: "NodeJS", value: 2 },
                                        { label: "MongoDB", value: 3 },
                                        { label: "ExpressJS", value: 4 },
                                        { label: "JavaScript", value: 5 },
                                        { label: "HTML", value: 6 },
                                        { label: "CSS", value: 7 },
                                        { label: "SASS", value: 8 },
                                        { label: "LESS", value: 9 },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default BlogCreate;
