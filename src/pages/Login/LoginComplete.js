import React from 'react';
import {Layout, Spin } from 'antd';

import  { path } from '../../config';
import { googleLogin } from '../../services/ajax';
import ErrorComponent from '../../components/Error'

class LoginComplete extends React.Component{
  state = {
    error: false,
    loggingIn: false
  }
  componentWillMount() {
    console.log('here');
    
    const qs = require('qs');
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    console.log(query);
    
    this.setState({
      loggingIn: true
    })
    
    googleLogin(
      qs.stringify(query),
      {},
      (response) => {
          const { jwt, user } = response.data.data;
          localStorage.setItem('token', jwt);
          localStorage.setItem('user', JSON.stringify(user));
          this.props.history.push(path.home);
          window.history.pushState({},'Home','/');
          this.setState({
            loggingIn: false
          })
          window.location.reload(true);
      }, (err) => {
        this.setState({
          error: true
        })
      }
    )
  }

  render() {
    const {error, loggingIn} = this.state;
    return (
      <>
        {
          loggingIn && <Spin/>
        }
        {
          error && <ErrorComponent />
        }
      </>
    )
  }
}

export default LoginComplete;
