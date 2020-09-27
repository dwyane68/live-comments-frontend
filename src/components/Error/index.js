import React from 'react';
import { Button, Result } from 'antd';

class ErrorComponent extends React.Component{
    constructor(props) {
        super(props);
    }
    
  render() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Button type="primary" onClick={() => this.props.history.push}>Back Home</Button>}
        />
    )
  }
}

export default ErrorComponent;
