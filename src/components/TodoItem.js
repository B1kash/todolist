import React, { useState, useEffect } from "react";
import { Col, Row, Checkbox, Popover, Button, Form, Input } from "antd";
// import { format } from "date-fns";
import "./Page.css";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { updateTodo } from "../features/todos/todoSlice";

import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todos/todoSlice";

const TodoItem = ({ todo }) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
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

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    }
  }, [todo]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
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
            <div className="iconedit" role="button" yavIndex={0}>
              <Popover
                content={
                  <Form onFinish={handleUpdate} form={form}>
                    <Form.Item
                      label=""
                      name="todo"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Edited todo",
                        },
                      ]}
                    >
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
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
                <EditTwoTone />
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
