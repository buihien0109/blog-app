import { Col, Row } from 'antd'
import React from 'react'
import TopViewBlogChart from './TopViewBlogChart'
import ViewMonthChart from './ViewMonthChart'

function ViewChart({ totalViewsByMonth, topViewBlogs }) {
    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <TopViewBlogChart data={topViewBlogs} />
            </Col>
            <Col span={12}>
                <ViewMonthChart data={totalViewsByMonth} />
            </Col>
        </Row>
    )
}

export default ViewChart