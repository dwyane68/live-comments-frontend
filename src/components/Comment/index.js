import React from 'react';
import {Button, message, Divider, Timeline, Comment, Avatar, Tooltip} from 'antd'
import DashboardLayout from "../../layout/Dashboard/DashboardLayout";
// import {deployProject, getProjects} from "../../services/ajax";
import {APP_URL, BASE_URL, SOCKET_PORT} from "../../config";

import moment from 'moment';

let token = localStorage.getItem('token');
const SocketIOClient = require('socket.io-client');

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
    // this.socket = SocketIOClient(`${BASE_URL}:${SOCKET_PORT}`, {
    this.socket = SocketIOClient(`http://127.0.0.1:1342`, {
      transports: ['websocket'],
      reconnection: true,
      upgrade: false,
    });
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.socket.on('connect', () => {
      console.log('Connected!');
    }); 
    this.socket.emit('join', {sub: user.sub});
    this.socket.on('message', this.handleData);
  }
  componentWillUnmount() {
    // this.socket.removeListener('message', this.handleData);
  }

  handleData = (mess) => {
    if(mess.code === 'message') {
      this.setState({
        comments: [...this.state.comments, mess.message],
      })
    } else {
      message.error(mess.message)
    }
  };

  render() {
    const { comments } = this.state;
    return (
        <>
          {
            comments && comments.map(comment => (
              <Comment
                author={<a>{comment.authorDetails.displayName}</a>}
                avatar={
                  <Avatar
                    src={comment.authorDetails.profileImageUrl}
                    alt={comment.authorDetails.displayName}
                  />
                }
                content={
                  <p>
                   {comment.snippet.displayMessage}
                  </p>
                }
                datetime={
                  <Tooltip title={moment(comment.snippet.publishedAt).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                }
              />
            ))
          }
        </>

    );
  }

}
export default Comments;
