import React from 'react'
import "./Header.scss"

import { Icon, Avatar, Dropdown, Menu } from "antd";

import { useMappedState, useDispatch } from 'redux-react-hook';
import { setMenuCollapse } from "@/redux/actions";

import { Link } from "react-router-dom"

const menu = (
  <Menu className="user-menu">
    <Menu.Item>
      <Link to="/user"><Icon type="user" className="user-menu-icon" />个人中心</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Link to="/login"><Icon type="logout" className="user-menu-icon" />退出登录</Link>
    </Menu.Item>
  </Menu >
);

const MainHeader: React.FC = () => {
  const collapse: boolean = useMappedState(state => state.collapse);
  const dispatch: dispatch = useDispatch();

  return (
    <div className="header">
      <Icon type={collapse ? 'menu-unfold' : 'menu-fold'} className="collapse-icon" onClick={() => dispatch(setMenuCollapse(!collapse))} />

      <Dropdown overlay={menu}>
        <span className="user">
          <Avatar className="user-avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          HangMine
        </span>
      </Dropdown>

    </div>
  )
}

export default MainHeader;