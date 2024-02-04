import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Spin, message, theme } from "antd";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
} from "../../../app/services/categories.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import CategoryTable from "./CategoryTable";

const breadcrumb = [{ label: "Danh sách danh mục", href: "/admin/categories" }];
const CategoryList = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const {
        data,
        isLoading: isFetchingCategories,
    } = useGetCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    if (isFetchingCategories) {
        return <Spin size="large" fullscreen />
    }

    const handleCreate = (values) => {
        createCategory(values)
            .unwrap()
            .then((data) => {
                setOpen(false);
                form.resetFields();
                message.success("Tạo danh mục thành công!");
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    const handleDelete = (id) => {
        deleteCategory(id)
            .unwrap()
            .then((data) => {
                message.success("Xóa danh mục thành công!");
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    const handeUpdate = (values) => {
        updateCategory(values)
            .unwrap()
            .then((data) => {
                message.success("Câp nhật danh mục thành công!");
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
                    <Button
                        style={{ backgroundColor: "rgb(60, 141, 188)" }}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setOpen(true)}
                    >
                        Tạo danh mục
                    </Button>
                    <RouterLink to="/admin/categories">
                        <Button
                            style={{ backgroundColor: "rgb(0, 192, 239)" }}
                            type="primary"
                            icon={<ReloadOutlined />}
                        >
                            Refresh
                        </Button>
                    </RouterLink>
                </Space>

                <CategoryTable
                    data={data}
                    onDelete={handleDelete}
                    onUpdate={handeUpdate}
                />
            </div>
            <Modal
                open={open}
                title="Tạo danh mục"
                footer={null}
                onCancel={() => setOpen(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreate}
                    autoComplete="off"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Tên danh mục không được để trống!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CategoryList;
