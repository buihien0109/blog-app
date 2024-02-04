import { Layout, Typography, theme } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppLayoutHeader from "./AppLayoutHeader";
import AppMenu from "./AppMenu";


const { Header, Content, Sider } = Layout;



const AppLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<Layout
			style={{
				minHeight: "100vh",
			}}
		>
			<Sider
				width={300}
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<Typography.Title
					level={4}
					style={{
						backgroundColor: "rgb(60, 141, 188)",
						color: "#fff",
						height: "64px",
						lineHeight: "64px",
						textAlign: "center",
					}}
				>
					ADMIN
				</Typography.Title>
				<AppMenu />
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<AppLayoutHeader />
				</Header>
				<Content
					style={{
						margin: "0 16px",
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};
export default AppLayout;
