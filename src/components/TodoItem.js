import React,{useState, useEffect} from 'react';
import { Col, Row,Checkbox , Popover,Button,Form,Input} from 'antd';
import { format } from 'date-fns';
import './Page.css'
import { DeleteTwoTone,EditTwoTone  } from '@ant-design/icons';
import { updateTodo } from '../features/todos/todoSlice';

import { useDispatch } from 'react-redux';
import { deleteTodo } from '../features/todos/todoSlice';
const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
//   const content = (
//     <div>
//       <input placeholder="todo"/>
//     <Button onClick={handleUpdate}>Click me</Button>
//     </div>);

const TodoItem = ({ todo }) => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

        useEffect(()=>{
            if(todo){
                setTitle(todo.title);
            }
        },[todo])

    const handleDelete  = () =>{
        dispatch(deleteTodo(todo.id));
    }
   const handleUpdate  = () =>{
       
        if(title){
            if(todo.title !== title){
                dispatch(updateTodo({
                    ...todo,
                    title
                }))
            }
        }
    }
    // const content = (
    //     );
  return (
    <Row>
      <Col span={24} >
      <Row>
      <Col span={8}><Checkbox onChange={onChange}></Checkbox> <p className='todotitle'>{todo.title}</p></Col>
      <Col span={8}>
        <div className='icondelete'
        // onClick={handleDelete}
        onKeyDown={handleDelete}
        role="button"
        yavIndex={0}>
        <DeleteTwoTone onClick={handleDelete} />
        </div>
        <div className='iconedit'
        
         
         role="button"
         yavIndex={0}>
        
        <Popover content={<Form
        onFinish={handleUpdate}
        form={form}>
            
            <Form.Item
        label=""
        name="todo"
        rules={[
          {
            required: true,
            message: 'Please input your Edited todo',
          },
        ]}
      >
        <Input value={title} onChange={(e)=> setTitle(e.target.value)} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Edit Todo
        </Button>
      </Form.Item>
        </Form>
    } title="Edit Todo" trigger="click">
        <EditTwoTone  />
    </Popover>
    
        </div>
      </Col>
      
    </Row>
      
      
      <p className='dateandtime'>{format(new Date(todo.time),'p, MM/dd/yyyy')}
      </p>
        
      </Col>
    </Row>
  )
}

export default TodoItem