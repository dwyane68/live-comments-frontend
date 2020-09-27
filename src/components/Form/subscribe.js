import React from 'react';
import { Form, Select, Input, Button, message, Card, Tag } from 'antd';
import {subscribe, unsubscribe } from "../../services/ajax";
import config from '../../config';
import Comments from '../Comment';

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class SubscribeForm extends React.Component {
  state = {
      utl: '',
      keywords: [],
      subscribed: false
  }
  
  handleSubscribe = (ev) => {
    ev.preventDefault();
    this.setState({
      confirmLoading: true,
      record: null
    });

    let user = JSON.parse(localStorage.getItem('admin'));
    this.props.form.validateFieldsAndScroll((err, values) => {
      let { url , keywords } = values;  
      const customUrl = `${url}&keywords=${keywords.join()}`;
      if (!err) {
        subscribe(
          {url: customUrl},
          response => {
            this.setState({
                visible: false,
                confirmLoading: false,
                subscribed: true,
                url,
                keywords
            });
            message.success("Subscribed!");
          },
          error => {
            message.error("Error while subscribing");
            this.props.form.resetFields();
            this.setState({
              visible: false,
              confirmLoading: false
            });
          }
        );
      } else {
        this.setState({
          confirmLoading: false
        });
      }
    });
  };

  unsubscribe = () => {
    unsubscribe({}, () => {}, () => {});
    this.setState({
        subscribed: false,
        url: '',
        keywords: ''
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    window.addEventListener('beforeunload', unsubscribe);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { url, keywords, subscribed } = this.state;
    return (
        <>
            {
                !subscribed && (
                    <Form
                        {...layout}
                        name="basic"
                        onSubmit={this.handleSubscribe}
                    >
                    <Form.Item
                        label="URL"
                    >
                        {getFieldDecorator("url", {
                        rules: [{ required: true, message: 'Please input livestream URL!' }]
                    })(<Input />)}
                    </Form.Item>
                    <Form.Item
                        label="Add Keywords"
                    >
                        {getFieldDecorator("keywords", {
                            rules: [{ required: true, message: 'Kewords are required!' }]
                        })(
                            <Select mode="tags" placeholder="add keywords">
                                
                            </Select>
                        )}
                        
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Subscribe
                        </Button>
                    </Form.Item>
                </Form>
                )
            }
            {
                subscribed && (
                    <Card>
                        <p><b>URL</b> : {url}</p>
                        <p>keywords</p>
                        {
                            keywords.map(keyword => (
                                <Tag>{keyword}</Tag>
                            ))
                        }

                        <Button type="primary" onClick={this.unsubscribe} style={{margin: 10}}>
                            Unsubscribe
                        </Button>
                        <Comments />

                    </Card>
                )
            }
        </>
    );
  }

}


const Subscribe = Form.create({ name: "subscribe" })(
    SubscribeForm
);
export default Subscribe;
