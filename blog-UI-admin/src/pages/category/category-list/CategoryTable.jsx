import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, message } from "antd";
import React, { useState } from "react";
import { useDeleteCategoryMutation } from "../../../app/services/categories.service";
import ModalUpdate from "./ModalUpdate";

const CategoryTable = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [categoryUpdate, setCategoryUpdate] = useState(null);
    const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

    const columns = [
        {
            title: "Tên danh mục",
            dataIndex: "name",
            key: "name",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Số lượng sử dụng",
            dataIndex: "used",
            key: "used",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "",
            dataIndex: "",
            key: "action",
            render: (text, record, index) => {
                return (
                    <Space>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setCategoryUpdate(record);
                                setOpen(true);
                            }}
                        ></Button>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                handleConfirm(record.id);
                            }}
                        ></Button>
                    </Space>
                );
            },
        },
    ];

    const handleConfirm = (id) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa danh mục này?",
            content: "Hành động này không thể hoàn tác!",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            okButtonProps: { loading: isLoading }, // Hiển thị loading trên nút OK
            onOk: () => {
                return new Promise((resolve, reject) => {
                    deleteCategory(id)
                        .unwrap()
                        .then(() => {
                            message.success("Xóa danh mục thành công!");
                            resolve(); // Đóng modal sau khi xóa thành công
                        })
                        .catch((error) => {
                            message.error(error.data.message);
                            reject(); // Không đóng modal nếu xóa thất bại
                        });
                });
            },
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    <OkBtn />
                </>
            ),
        });
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
            />

            {open && (
                <ModalUpdate
                    open={open}
                    onCancel={() => setOpen(false)}
                    category={categoryUpdate}
                />
            )}
        </>
    );
};
export default CategoryTable;
