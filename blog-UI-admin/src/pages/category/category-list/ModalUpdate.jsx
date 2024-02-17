import { Button, Form, Input, Modal, Space, message } from "antd";
import React from "react";
import { useUpdateCategoryMutation } from "../../../app/services/categories.service";

const ModalUpdate = (props) => {
    const { category, open, onCancel } = props;
    const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

    const onFinish = (values) => {
        updateCategory({ id: category.id, name: values.name })
            .unwrap()
            .then((data) => {
                message.success("Cập nhật danh mục thành công!");
                onCancel();
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    return (
        <>
            <Modal
                open={open}
                title="Cập nhật danh mục"
                footer={null}
                onCancel={onCancel}
                confirmLoading={isLoading}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{ name: category?.name }}
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Tên danh mục không được để trống!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Cập nhật
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};
export default ModalUpdate;
