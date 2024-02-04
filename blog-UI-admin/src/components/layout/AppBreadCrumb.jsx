import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function AppBreadCrumb({ items }) {
    return (
        <Breadcrumb style={{padding: '1rem 0'}}>
            <Breadcrumb.Item key="home">
                <HomeOutlined />
                <RouterLink to="/admin/dashboard">Dashboard</RouterLink>
            </Breadcrumb.Item>

            {items.map((item, index) => (
                <Breadcrumb.Item key={index}>
                    {index === items.length - 1 ? (
                        <span>{item.label}</span>
                    ) : (
                        <RouterLink to={item.href}>{item.label}</RouterLink>
                    )}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}

export default AppBreadCrumb