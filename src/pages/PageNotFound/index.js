import React from 'react';
import { Button, Result } from 'antd';
import DashboardLayout from '../../layout/Dashboard/DashboardLayout';
class PageNotFound extends React.Component{
  render() {
    return (
      <DashboardLayout {...this.props}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary" onClick={() => this.props.history.push('/')}>Back Home</Button>}
        />
      </DashboardLayout>
    )
  }
}

export default PageNotFound;
