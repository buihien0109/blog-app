import {
    Button,
    Col,
    Flex,
    Modal,
    Row,
    Space,
    Upload
} from "antd";
import React, { useState } from "react";

function ImageModal() {
    const imagesData = useSelector((state) => state.images);
    const { isLoading: isFetchingImages } = useGetImagesQuery();
    const images = imagesData && imagesData.map((image) => {
        return {
            id: image.id,
            url: `http://localhost:8080${image.url}`,
        };
    });
    const [uploadImage, { isLoading: isLoadingUploadImage }] =
        useUploadImageMutation();
    const [deleteImage, { isLoading: isLoadingDeleteImage }] =
        useDeleteImageMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageSelected, setImageSelected] = useState(null);
    const [avatar, setAvatar] = useState(null);

    if (isFetchingImages) {
        return <Spin size="large" fullscreen />;
    }

    return (
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
                            loading={isLoadingUploadImage}
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
                            form.setFieldsValue({
                                avatar: imageSelected,
                            });
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
                    loading={isLoadingDeleteImage}
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
                                    className={`${imageSelected === image.url
                                        ? "image-selected"
                                        : ""
                                        } image-item`}
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
    )
}

export default ImageModal