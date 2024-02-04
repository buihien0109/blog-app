import { LeftOutlined, RetweetOutlined, SaveOutlined } from "@ant-design/icons";
import {
    Avatar,
    Button,
    Col,
    Flex,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Spin,
    Upload,
    message,
    theme
} from "antd";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useDeleteImageMutation, useGetImagesQuery, useUploadImageMutation } from "../../../app/services/images.service";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../../app/services/users.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";


const UserDetail = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();
    const { userId } = useParams();
    const {
        data: user,
        isLoading: isFetchingUser,
    } = useGetUserByIdQuery(userId);
    const {
        data,
        isLoading: isFetchingImages,
    } = useGetImagesQuery();
    const images = data && data.map((image) => {
        return {
            id: image.id,
            url: `http://localhost:8080${image.url}`
        };
    });
    const [updateUser] = useUpdateUserMutation();
    const [uploadImage] = useUploadImageMutation();
    const [deleteImage] = useDeleteImageMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageSelected, setImageSelected] = useState(null);
    const [avatar, setAvatar] = useState(null);


    const breadcrumb = [
        { label: "Danh sách user", href: "/admin/users" },
        { label: user?.name, href: `/admin/users/${user?.id}/detail` },
    ];

    useEffect(() => {
        if (user && avatar === null) {
            setAvatar(user?.avatar);
        }
    }, [user, avatar]);

    if (isFetchingUser || isFetchingImages) {
        return <Spin size="large" fullscreen />
    }

    const handleUpdate = () => {
        form.validateFields()
            .then((values) => {
                return updateUser({ id: user.id, ...values }).unwrap()
            })
            .then((data) => {
                message.success("Cập nhật thông tin user thành công!");
            })
            .catch((error) => {
                console.log("error", error);
                message.error(error.data.message);
            });
    }

    const handleResetPassword = () => {
        console.log("Reset password");
    };

    const selecteImage = (image) => () => {
        setImageSelected(image);
    };

    const handleUploadImage = ({ file, onSuccess, onError }) => {
        console.log("file", file)
        const formData = new FormData();
        formData.append("file", file);
        uploadImage(formData)
            .unwrap()
            .then((data) => {
                onSuccess();
                message.success("Tải ảnh lên thành công!");
            })
            .catch((error) => {
                onError();
                message.error(error.data.message);
            });
    };

    const handleDeleteImage = () => {
        deleteImage(imageSelected)
            .unwrap()
            .then((data) => {
                message.success("Xóa ảnh thành công!");
                setImageSelected(null);
            })
            .catch((error) => {
                console.log(error)
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
                        icon={<SaveOutlined />}
                        onClick={handleUpdate}
                    >
                        Cập nhật
                    </Button>
                    <Button
                        style={{ backgroundColor: "rgb(243, 156, 18)" }}
                        type="primary"
                        icon={<RetweetOutlined />}
                        onClick={handleResetPassword}
                    >
                        Reset mật khẩu
                    </Button>
                </Space>

                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={user}
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
                                <Input placeholder="Enter email" disabled />
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

                            <Form.Item name="avatar">
                                <Space direction="vertical">
                                    <Avatar
                                        src={<img src={avatar} alt="avatar" />}
                                        size={180}
                                    />
                                    <Button type="primary" onClick={() => setIsModalOpen(true)}>
                                        Thay đổi ảnh đại diện
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Modal
                    title="Chọn ảnh của bạn"
                    open={isModalOpen}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setImageSelected(null);
                    }}
                    footer={null}
                    width={1200}
                    style={{ top: 20 }}
                >
                    <Flex justify="space-between" align="center">
                        <Space direction="horizontal">
                            <Upload
                                maxCount={1}
                                customRequest={handleUploadImage}
                                showUploadList={false}
                            >
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: "rgb(243, 156, 18)",
                                    }}
                                >
                                    Tải ảnh lên
                                </Button>
                            </Upload>

                            <Button
                                type="primary"
                                disabled={!imageSelected}
                                onClick={() => {
                                    setAvatar(imageSelected);
                                    setIsModalOpen(false);
                                    form.setFieldsValue({ avatar: imageSelected });
                                }}
                            >
                                Chọn ảnh
                            </Button>
                        </Space>
                        <Button
                            type="primary"
                            disabled={!imageSelected}
                            danger
                            onClick={handleDeleteImage}
                        >
                            Xóa ảnh
                        </Button>
                    </Flex>

                    <div style={{ marginTop: "1rem" }} id="image-container">
                        <Row gutter={[16, 16]} wrap={true}>
                            {images &&
                                images.map((image, index) => (
                                    <Col span={6} key={index}>
                                        <div
                                            className={
                                                `${imageSelected === image.url ? "image-selected" : ""} image-item`
                                            }
                                            onClick={selecteImage(image.url)}
                                        >
                                            <img
                                                src={image.url}
                                                alt={`image-${index}`}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                    </Col>
                                ))}
                        </Row>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default UserDetail;
