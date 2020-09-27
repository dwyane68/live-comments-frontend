import React from 'react';
import ErrorComponent from '.';
class ErrorHandler extends React.Component {
    constructor(props) {
      super(props)
      this.state = { errorOccurred: false, hasError: false }
    }
  
    componentDidCatch(error, info) {
      this.setState({ errorOccurred: true })
    //   logErrorToMyService(error, info)
    }
  
    render() {
      return this.state.errorOccurred ? <ErrorComponent/> : this.props.children
    }
  }
  export default ErrorHandler;