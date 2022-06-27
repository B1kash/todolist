import React, { useState, useEffect,} from "react";
import { Col, Row, Checkbox, Popover, Button, Form, Input } from "antd";

import "./Page.css";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { updateTodo } from "../features/todos/todoSlice";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todos/todoSlice";

const TodoItem = ({ todo }) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState(todo.title);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  
  const onChange = (e) => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? "incomplete" : "complete" })
    );
  };

  useEffect(()=>{
    if(todo.status === 'complete'){
      setChecked(true)
    }else{
      setChecked(false);
    }
  },[todo.status]);

  

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Task deleted successfully')
  };
  const handleUpdate = () => {
    if (title) {
      if (todo.title !== title) {
        dispatch(
          updateTodo({
            ...todo,
            title,
          })
        );
      }
      toast.success('Task updated successfully')
    }
  };

  return (
    <>
     {/* new design */}

    <Row>
      <Col span={16} offset={4}>
      <Row>
      <Col span={4} >
        <div className="selcheck">
      <Checkbox checked={checked} setChecked={setChecked} onChange={onChange}></Checkbox>
      </div>
      </Col>
      <Col span={8} >
      {todo.title}
      
      </Col>
      <Col span={4} >
      <div
              className="icondelete"
              
              onKeyDown={handleDelete}
              role="button"
              yavIndex={0}
            >
              <DeleteTwoTone onClick={handleDelete} />
            </div>
            <div className="iconedit" role="button" yavindex={0}>
              <Popover 
              
                content={
                  <Form onFinish={handleUpdate}  form={form}>
                    <Form.Item
                      label=""
                      
                      name="todo"
                      rules={[
                        {
                          required: false,
                          message: "Please input your Edited todo",
                        },
                      ]}
                    >
                      <Input
                        
                        type="text"
                        defaultValue={title}
                        
                        
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      {/* <p className="todostateinput">{title}</p> */}
                      
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
                }
                title="Edit Todo"
                trigger="click"
              >
                <EditTwoTone  />
              </Popover>
            </div>
       
      </Col>
      
    </Row>
      </Col>
    </Row>


    {/* new design ends here*/}

    
    </>
  );
};

export default TodoItem;
