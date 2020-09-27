import React from 'react';
import {NavLink} from "react-router-dom";
import { Icon, Layout, Button } from 'antd';
import SidebarLayout from "../Sidebar/SidebarLayout";
import { path } from "../../config";

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
