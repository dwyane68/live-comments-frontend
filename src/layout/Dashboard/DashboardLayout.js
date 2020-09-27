import React from 'react';
import { Icon, Layout, Button } from 'antd';

const { Footer } = Layout;

class DashboardLayout extends  React.Component{

  render() {
    return (
      <main>
        <div className={'main-bar'}>
          {this.props.children}
        </div>

        <Footer>
          Developed by
          <Button type="link" href="" block target="_blank">
            Shubham
          </Button>
        </Footer>
      </main>
    )
  }
}

export default DashboardLayout;
