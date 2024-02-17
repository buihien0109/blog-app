import { Spin, theme } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { useGetDashboardDataQuery } from "../../app/services/dashboard.service";
import AppBreadCrumb from "../../components/layout/AppBreadCrumb";
import ViewChart from "./chart/ViewChart";
import DashboardSummary from "./summary/DashboardSummary";
import DashBoardTable from "./table/DashBoardTable";

const Dashboard = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { data, isLoading: isFetchingDashboard } = useGetDashboardDataQuery();

    if (isFetchingDashboard) {
        return <Spin size="large" fullscreen />;
    }

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <AppBreadCrumb items={[]} />
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <DashboardSummary
                    countLatestBlogs={data?.countLatestBlogs}
                    countLatestUsers={data?.countLatestUsers}
                    countLatestComments={data?.countLatestComments}
                />
                <ViewChart
                    totalViewsByMonth={data?.totalViewsByMonth}
                    topViewBlogs={data?.topViewBlogs}
                />
                <DashBoardTable
                    latestBlogs={data?.latestBlogs}
                    latestComments={data?.latestComments}
                    latestUsers={data?.latestUsers}
                />
            </div>
        </>
    );
};

export default Dashboard;
