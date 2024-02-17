import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link to="/admin/dashboard">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default ForbiddenPage;