import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space, message, theme } from "antd";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../../app/services/users.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";

const breadcrumb = [
    { label: "Danh sách user", href: "/admin/users" },
    { label: "Tạo user", href: "/admin/users/create" },
];
const UserCreate = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [createUser, { isLoading }] = useCreateUserMutation();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                return createUser(values).unwrap()
            })
            .then((data) => {
                message.success("Tạo user thành công!");
                setTimeout(() => {
                    navigate(`/admin/users/${data.id}/detail`);
                }, 1500)
            })
            .catch((error) => {
                message.error(error.data.message);
            });
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
                    <RouterLink to="/admin/users">
                        <Button type="default" icon={<LeftOutlined />}>
                            Quay lại
                        </Button>
                    </RouterLink>
                    <Button
                        style={{ backgroundColor: "rgb(60, 141, 188)" }}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreate}
                        loading={isLoading}
                    >
                        Tạo user
                    </Button>
                </Space>

                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ role: "USER" }}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Họ tên"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Họ tên không được để trống!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter name" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Họ tên không được để trống!",
                                    },
                                    {
                                        type: "email",
                                        message: "Email không đúng định dạng!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter email" />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Họ tên không được để trống!",
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Enter password" />
                            </Form.Item>

                            <Form.Item
                                label="Quyền"
                                name="role"
                                rules={[
                                    {
                                        required: true,
                                        message: "Quyền không được để trống!",
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    options={[
                                        { label: "ADMIN", value: "ADMIN" },
                                        { label: "USER", value: "USER" },
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

export default UserCreate;
