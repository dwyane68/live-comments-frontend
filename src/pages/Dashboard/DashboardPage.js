import React from 'react';
import {Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import {Card, Row, Col, Select, Table, Drawer, Button, message, Divider, Input} from 'antd'

import DashboardLayout from "../../layout/Dashboard/DashboardLayout";
// import {getProjects} from "../../services/ajax";
import checkRedirect from "../../services/checkRedirect";
import Subscribe from '../../components/Form/subscribe';
// import styles from './DashboardStyles.scss'

class DashboardPage extends React.Component {
  state = {
    subscribed: false,
    url: '',
    keywords: [],
  }

  componentWillMount() {
    
  }

  render() {
    const {subscribed} = this.state;
    return (
        <DashboardLayout {...this.props}>
            {
              !subscribed && (
                <Card>
                  <Subscribe/>
                </Card>
              )
            }
        </DashboardLayout>

    );
  }

}
export default DashboardPage;
