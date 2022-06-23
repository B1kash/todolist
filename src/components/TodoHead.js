import React, {useState} from 'react'
import { Col, Row } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import './Page.css'
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';
import { v4 as uuid} from 'uuid';
import TodoModel from './TodoModel';

const menu = (
  <Menu
    items={[
    
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="#">
            Completed
          </a>
        ),
        key: '0',
      },
        {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="#">
            Not Completed
          </a>
        ),
        key: '1',
      },
      
      
    ]}
  />
);
const TodoHead = () => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    // const onFinish = (values) => {
    //     console.log('Success:', values);
    //   };
    
    //   const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    //   };
    //   const handleSubmit = (e) =>{
    //     e.preventDefault();
        
    //     if(title){
    //         console.log(title)
    //         dispatch(
    //             addTodo({
    //             id:uuid(),
    //             title,
    //             time : new Date().toLocaleDateString(),
    //         })
    //         );
    //     }
    //   };

    const handleSubmit = (e) => {
        // e.preventDefault();
        
        if (title) {
            
            dispatch(
              addTodo({
                id: uuid(),
                title,
                
                time: new Date().toLocaleString(),
                
              })
              
                
            );
           
          
         
         
        }
      };

  return (
    <>
    <Row className='inputtodo'>
      <Col span={12}>
      <Form form={form}
      onSubmit={(e) => handleSubmit(e)}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
    //   onFinishFailed={onFinishFailed}
      autoComplete="off"
      
    >
      <Form.Item
        label=""
        name="username" className='todoinput'>
        <Input value={title} onChange={(e)=> setTitle(e.target.value)}/>
      </Form.Item>
        <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button  type="primary" htmlType="submit">
         Add Todo
        </Button>
        
      </Form.Item>
    </Form>
    
      </Col>
      <Col span={12}>
      <Dropdown overlay={menu}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
       All
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
      </Col>
    </Row>
   
    </>
  )
}

export default TodoHead