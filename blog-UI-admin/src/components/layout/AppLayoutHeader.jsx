import { Avatar, Dropdown, Flex, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/slices/auth.slice";

function AppLayoutHeader() {
    const { auth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        message.success("Đăng xuất thành công");
    };

    const items = [
        {
            key: "1",
            label: <a href="/">Quay lại trang chủ</a>,
        },
        {
            key: "2",
            label: <span onClick={handleLogout}>Đăng xuất</span>,
        },
    ];

    return (
        <Flex
            justify="flex-end"
            align="center"
            style={{ padding: "0 16px", height: "100%" }}
        >
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomLeft"
                trigger={["click"]}
            >
                <Avatar
                    src={<img src={auth.avatar} alt="avatar" />}
                    size={40}
                />
            </Dropdown>
        </Flex>
    );
}

export default AppLayoutHeader;
