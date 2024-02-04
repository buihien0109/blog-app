import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import React, { useState } from "react";
import ModalUpdate from "./ModalUpdate";

const CategoryTable = ({ data, onDelete, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [categoryUpdate, setCategoryUpdate] = useState(null);

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

    const handleCancel = () => {
        setOpen(false);
    };

    const handleUpdate = (values) => {
        const { id, name } = values;
        onUpdate({ id, name });
    };

    const handleConfirm = (id) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có muốn xóa danh mục này không?",
            onOk: () => onDelete(id),
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
            <Table columns={columns} dataSource={data} rowKey={(record) => record.id}/>

            {open && (
                <ModalUpdate
                    open={open}
                    onCancel={handleCancel}
                    onHandleUpdate={handleUpdate}
                    category={categoryUpdate}
                />
            )}
        </>
    );
};
export default CategoryTable;
