import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import Home from "@/views/Home/Home";
import MainHeader from "@/components/Main/Header/Header"
import "./Main.scss"
import HTabs from "@/components/Main/HTabs/HTabs";
const { Content, Header } = Layout;



const Main: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="main-header">
        <MainHeader></MainHeader>
      </Header>

      <Content className="main-content">
        <HTabs></HTabs>
        <Switch>
          <Route path="/app/home" component={Home} />
        </Switch>
      </Content>
    </Layout>

  )
}


export default Main;
