import { Button, Form, Input, Spin, Typography, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useLoginMutation } from "../../app/services/auth.service";

const StyledTitle = styled(Typography.Title).attrs({ level: 4 })`
  margin-bottom: 0 !important;
  padding: 16px;
  text-align: center;
  width: 100%;
  color: #fff !important;
  background: linear-gradient(to right, rgb(35, 37, 38), rgb(65, 67, 69));
`;

const App = () => {
    const [login, { isLoading }] = useLoginMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Nếu đã login -> chuyển hướng sang trang homepage
    if (isAuthenticated) {
        return <Navigate to={"/admin/blogs/own-blogs"} />;
    }

    const handleLogin = async (values) => {
        try {
            const response = await login(values).unwrap();
            message.success("Đăng nhập thành công!");
            navigate("/admin/blogs/own-blogs");
        } catch (error) {
            console.log(error);
            message.error(error.data.message)
        }
    };

    return (
        <div className="login-container">
            <Spin spinning={isLoading} tip="Đang xử lý...">
                <div className="form-login">
                    <StyledTitle>
                        Đăng nhập Admin
                    </StyledTitle>
                    <Form
                        layout="vertical"
                        style={{
                            backgroundColor: "#fff",
                            padding: 24,
                        }}
                        onFinish={handleLogin}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email không được để trống!",
                                },
                                {
                                    type: "email",
                                    message: "Email không đúng định dạng!",
                                },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Mật khẩu không được để trống!",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button type="primary" htmlType="submit" block>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>

        </div>
    );
};
export default App;
