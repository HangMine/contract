import React, { Component } from "react";
import { Layout } from "antd";
import Aside from "@/components/Aside/Aside";
import Main from "@/components/Main/Main";

import routes from "@/router";

class App extends Component {
  render() {
    return (

      <Layout>
        <Aside menus={routes} />
        <Main />
      </Layout>


    );
  }
}

export default App;