import React from 'react';
import {Card, Button, Layout, Space } from 'antd';
import logo from '../../images/logo.png';

import  { BASE_URL } from './../../config';
import checkRedirect from "../../services/checkRedirect";
// import { GoogleOutlined, HomeOutlined } from '@ant-design/icons';

const { Footer } = Layout;

class LoginPage extends React.Component{
  componentWillMount() {
    checkRedirect(this.props);
  }

  render() {
    return (
      <main className={'auth'}>

        <div className={'logo'}>
          <img src={logo} alt={'logo'}/>
        </div>


          <div className={'login'}>
          <Card bordered={false}>
            <div className={'title'}>Quillbot</div>
            <p className={'sub-title'}>Please log in using google to continue!</p>
              <a href={`${BASE_URL}/auth/google`}>
                {/* <Button block type={'primary'} size={'large'} shape={'round'} icon={<GoogleOutlined />}> */}
                <Button block type={'primary'} size={'large'} shape={'round'}>
                  Continue with Google
                </Button>
              </a>
            
          </Card>
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

export default LoginPage;
