import React from 'react'
import { Layout } from 'antd';
import './Page.css'
import TodoHead from './TodoHead';
import Todo from './Todo';

import 'antd/dist/antd.min.css';
const { Header, Footer,Content } = Layout;


const Page = () => {
  return (
    <>
    <Layout>
      <Header className='navbar'>
        <h1 className='brand'>TODO-LIST</h1>
      </Header>
      <Content>
        <TodoHead />
        <Todo />
      </Content>
      <Footer>
        
        </Footer>
    </Layout>
    </>
  )
}

export default Page