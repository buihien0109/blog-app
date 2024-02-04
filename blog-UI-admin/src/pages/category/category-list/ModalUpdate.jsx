import { Button, Form, Input, Modal, Space } from "antd";
import React from "react";

const ModalUpdate = (props) => {
    const { category, open, onCancel, onHandleUpdate } = props;


    const onFinish = (values) => {
        const { name } = values;
        onHandleUpdate({ id: category.id, name });
        onCancel();
    };

    return (
        <>
            <Modal
                open={open}
                title="Cập nhật danh mục"
                footer={null}
                onCancel={onCancel}
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
                            <Button type="primary" htmlType="submit">
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
