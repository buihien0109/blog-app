import { Avatar, Dropdown, Flex } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function AppLayoutHeader() {
    const { auth } = useSelector((state) => state.auth);

    const handleLogout = () => {
        console.log("Logout");
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
