import { Col, Row } from 'antd'
import React from 'react'
import SummaryBox from './SummaryBox'

function DashboardSummary({ countLatestBlogs, countLatestUsers, countLatestComments }) {
    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <SummaryBox
                    title="User mới/ Tổng số user"
                    content={`${countLatestUsers?.count} / ${countLatestUsers?.total}`}
                    className="primary"
                    link="/admin/users"
                />
            </Col>
            <Col span={8}>
                <SummaryBox
                    title="Bài viết mới/ Tổng số bài"
                    content={`${countLatestBlogs?.count} / ${countLatestBlogs?.total}`}
                    className="info"
                    link="/admin/blogs"
                />
            </Col>
            <Col span={8}>
                <SummaryBox
                    title="Bình luận mới"
                    content={countLatestComments}
                    className="warning"
                    link="#"
                />
            </Col>
        </Row>
    )
}

export default DashboardSummary