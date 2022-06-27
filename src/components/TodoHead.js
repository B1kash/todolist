import React, { useState } from "react";
import { Col, Row } from "antd";
import { Button, Form, Input } from "antd";

import "./Page.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateFilterStatus } from "../features/todos/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const TodoHead = () => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const handleSubmit = (e) => {
    if (title) {
      dispatch(
        addTodo({
          id: uuid(),
          title,
          status: "incomplete",
          time: new Date().toLocaleString(),
        })
      );
      toast.success('Task added Succesfully');
    }
  };

  const updateFilter = (e) => {
    e.preventDefault();

    dispatch(updateFilterStatus(e.target.value));
    console.log("updating");
  };

  function SelectButton({ children, id, ...rest }) {
    return (
      <select id={id} {...rest}>
        {children}
      </select>
    );
  }
  return (
    <>
    {/* new template */}
    <Row>
    
      <Col span={14} offset={5}>
      <Form
            form={form}
            onSubmit={(e) => handleSubmit(e)}
            name="basic"
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item label="" name="username" className="todoinput">
              <span>
              <Input value={title} placeholder='Add task' onChange={(e) => setTitle(e.target.value)} />
              
              
              </span>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 1,
              }}
            >
              <Button type="primary" htmlType="submit">
                Add Todo
              </Button>
            </Form.Item>
          </Form>
      </Col>
      
    </Row>
    <Row>
      <Col span={12} offset={6} >
        <div className="selbtn">
        Filter
      <SelectButton
            id="status"
            onChange={(e) => updateFilter(e)}
            value={filterStatus}
            
          >
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Completed</option>
          </SelectButton>
          </div>
      </Col>
    </Row>

    {/* end of new template */}



      
    </>
  );
};

export default TodoHead;
