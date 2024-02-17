import { Col, Divider, Flex, Row, Typography } from 'antd'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import TableBlog from './TableBlog'
import TableComment from './TableComment'
import TableUser from './TableUser'

function DashBoardTable({ latestBlogs, latestComments, latestUsers }) {
    return (
        <Row gutter={[24, 16]}>
            <Divider />
            <Col span={12}>
                <Flex justify='space-between' align='center' style={{marginBottom: 10}}>
                    <Typography.Title level={4} style={{marginBottom: 0}}>Bài viết mới nhất</Typography.Title>
                    <RouterLink to="/admin/blogs">Xem tất cả</RouterLink>
                </Flex>
                <TableBlog data={latestBlogs} />
            </Col>
            <Col span={12}>
                <Flex justify='space-between' align='center' style={{marginBottom: 10}}>
                    <Typography.Title level={4} style={{marginBottom: 0}}>User mới nhất</Typography.Title>
                    <RouterLink to="/admin/users">Xem tất cả</RouterLink>
                </Flex>
                <TableUser data={latestUsers} />
            </Col>
            <Col span={24}>
                <Divider />
                <Typography.Title level={4}>Bình luận mới nhất</Typography.Title>
                <TableComment data={latestComments} />
            </Col>
        </Row>
    )
}

export default DashBoardTable