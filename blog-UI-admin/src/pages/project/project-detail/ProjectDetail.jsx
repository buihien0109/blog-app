import { DeleteOutlined, LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  Space,
  Spin,
  Upload,
  message,
  theme
} from "antd";
import "easymde/dist/easymde.min.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteImageMutation,
  useGetImagesQuery,
  useUploadImageMutation,
} from "../../../app/services/images.service";
import { useDeleteProjectMutation, useGetProjectByIdQuery, useUpdateProjectMutation } from "../../../app/services/projects.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import { Helmet } from "react-helmet";

const ProjectDetail = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { projectId } = useParams();
  const imagesData = useSelector((state) => state.images);
  const { data: project, isLoading: isFetchingProject } =
    useGetProjectByIdQuery(projectId);
  const { isLoading: isFetchingImages } =
    useGetImagesQuery(projectId);

  const images =
    imagesData &&
    imagesData.map((image) => {
      return {
        id: image.id,
        url: `http://localhost:8080${image.url}`,
      };
    });
  const [updateProject, { isLoading: isLoadingUpdateProject }] =
    useUpdateProjectMutation();
  const [deleteProject, { isLoading: isLoadingDeleteProject }] =
    useDeleteProjectMutation();
  const [uploadImage, { isLoading: isLoadingUploadImage }] =
    useUploadImageMutation();
  const [deleteImage, { isLoading: isLoadingDeleteImage }] =
    useDeleteImageMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // số lượng hình ảnh mỗi trang
  const totalImages = images.length; // tổng số hình ảnh
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalImages);
  const imagesRendered = images.slice(startIndex, endIndex);

  const breadcrumb = [
    { label: "Danh sách project", href: "/admin/projects" },
    { label: project?.title, href: `/admin/projects/${project?.id}/detail` },
  ];

  useEffect(() => {
    if (project && thumbnail === null) {
      setThumbnail(project?.thumbnail);
    }
  }, [project, thumbnail]);

  if (isFetchingProject || isFetchingImages) {
    return <Spin size="large" fullscreen />;
  }

  const onPageChange = page => {
    setCurrentPage(page);
  };

  const handleUpdate = () => {
    form.validateFields()
      .then((values) => {
        return updateProject({ id: projectId, ...values }).unwrap();
      })
      .then((data) => {
        message.success("Cập nhật project thành công!");
      })
      .catch((error) => {
        console.log("error", error);
        message.error(error.data.message);
      });
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa project này?",
      content: "Hành động này không thể hoàn tác!",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        deleteProject(project.id)
          .unwrap()
          .then((data) => {
            message.success("Xóa project thành công!");
            setTimeout(() => {
              navigate("/admin/projects");
            }, 1500);
          })
          .catch((error) => {
            message.error(error.data.message);
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

  const selecteImage = (image) => () => {
    setImageSelected(image);
  };

  const handleUploadImage = ({ file, onSuccess, onError }) => {
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
    const imageObj = images.find((image) => image.url == imageSelected);
    if (!imageObj) {
      return;
    }
    deleteImage(imageObj.id)
      .unwrap()
      .then((data) => {
        message.success("Xóa ảnh thành công!");
        setImageSelected(null);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.data.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>{project.title}</title>
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
        <Flex justify="space-between" align="center" style={{ marginBottom: "1rem" }}>
          <Space>
            <RouterLink to="/admin/projects">
              <Button type="default" icon={<LeftOutlined />}>
                Quay lại
              </Button>
            </RouterLink>
            <Button
              style={{ backgroundColor: "rgb(60, 141, 188)" }}
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleUpdate}
              loading={isLoadingUpdateProject}
            >
              Cập nhật
            </Button>
          </Space>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            loading={isLoadingDeleteProject}
          >
            Xóa project
          </Button>
        </Flex>

        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          initialValues={project}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Tên project"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Tên dự án không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Enter title" />
              </Form.Item>

              <Form.Item
                label="Link source code"
                name="source"
                rules={[
                  {
                    required: true,
                    message: "Link source code không được để trống!",
                  }
                ]}
              >
                <Input placeholder="Enter link source code" />
              </Form.Item>

              <Form.Item
                label="Link demo"
                name="link"
              >
                <Input placeholder="Enter link demo" />
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
                <Input.TextArea
                  rows={4}
                  placeholder="Enter description"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="thumbnail" label="Ảnh project">
                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: 300,
                      objectFit: "cover",
                    }}
                    src={thumbnail}
                    alt="Thumbnail"
                  />
                  <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Thay đổi ảnh project
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
                  loading={isLoadingUploadImage}
                >
                  Tải ảnh lên
                </Button>
              </Upload>

              <Button
                type="primary"
                disabled={!imageSelected}
                onClick={() => {
                  setThumbnail(imageSelected);
                  setIsModalOpen(false);
                  form.setFieldsValue({
                    thumbnail: imageSelected,
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
              {imagesRendered &&
                imagesRendered.map((image, index) => (
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

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalImages}
            onChange={onPageChange}
            showSizeChanger={false}
            style={{ marginTop: 16, textAlign: 'center' }}
          />
        </Modal>
      </div>
    </>
  );
};

export default ProjectDetail;
