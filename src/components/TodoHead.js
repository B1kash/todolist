import React, { useState } from "react";
import { Col, Row } from "antd";
import { Button, Form, Input } from "antd";

import "./Page.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateFilterStatus } from "../features/todos/todoSlice";
import { v4 as uuid } from "uuid";

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
      <Row className="inputtodo">
        <Col span={12}>
          <Form
            form={form}
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
            autoComplete="off"
          >
            <Form.Item label="" name="username" className="todoinput">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Add Todo
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <SelectButton
            id="status"
            onChange={(e) => updateFilter(e)}
            value={filterStatus}
          >
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Completed</option>
          </SelectButton>
        </Col>
      </Row>
    </>
  );
};

export default TodoHead;
