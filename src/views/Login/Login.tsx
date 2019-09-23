import React, { useState } from "react";
import { Input, Icon, Button, Checkbox } from 'antd';
import "./Login.scss";

import history from "@/router/history";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const login = () => {
  history.push('/app/home')
}

const autoClick = (e: CheckboxChangeEvent) => {
  console.log(e.target.checked);
}

const Login: React.FC = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login">
      <div className="login-main">
        <div className="login-header">
          <img className="login-logo" src={require('@/logo.svg')} alt="logo" />
          <h2 className="login-title">合同线上审批系统</h2>
        </div>

        <div className="login-body">
          <Input className="login-input" placeholder="用户名" prefix={<Icon type="user" />} onChange={e => setUser(e.target.value)} />
          <Input.Password className="login-input" placeholder="密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={e => setPassword(e.target.value)} />
          <Checkbox className="auto-login" onChange={autoClick}>自动登录</Checkbox>
          <Button type="primary" block onClick={login}>登录</Button>
        </div>


      </div>
    </div>

  )
}

export default Login;