import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, message, theme } from "antd";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "../../../app/services/projects.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import { Helmet } from "react-helmet";

const breadcrumb = [
  { label: "Danh sách project", href: "/admin/projects" },
  { label: "Tạo project", href: "/admin/projects/create" },
];
const ProjectCreate = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleCreate = () => {
    form.validateFields()
      .then((values) => {
        return createProject(values).unwrap()
      })
      .then((data) => {
        message.success("Tạo project thành công!");
        setTimeout(() => {
          navigate(`/admin/projects/${data.id}/detail`);
        }, 1500)
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Tạo project</title>
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
        <Space style={{ marginBottom: "1rem" }}>
          <RouterLink to="/admin/projects">
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
            Tạo project
          </Button>
        </Space>

        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Row>
            <Col span={12}>
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
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ProjectCreate;
