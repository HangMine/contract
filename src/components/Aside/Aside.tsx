import React, { useState, useEffect } from "react";
import { Menu, Icon, Layout } from "antd";
import { Link } from 'react-router-dom';
import "./Aside.scss";
import AsideHeader from "./AsideHeader/AsideHeader"

import { useMappedState, useDispatch } from 'redux-react-hook';
import { setTab, setMenuCollapse } from '@/redux/actions'

import history from '@/router/history'
import { flatRoutes } from '@/router'

const { Sider } = Layout;

const SubMenu = Menu.SubMenu;

type prop = {
  menus: routes,
}

// 获取菜单路径
const getMenuPath = (activeTab: string) => {
  const activeTabItem = flatRoutes.find(route => route.id === activeTab) || { path: '' };
  const path = activeTabItem.path!;
  const menuPath = path.slice(1).split('/');
  return menuPath
}

const Aside: React.FC<prop> = ({ menus }) => {
  const dispatch: dispatch = useDispatch();

  const [menuPath, setmenuPath]: [string[], dispatch] = useState([]);

  // 当前菜单或标签页改变时，设置菜单路径
  const activeTab: string = useMappedState(state => state.tabs).activeTab;
  useEffect(() => {
    currentSetMenuPath()
  }, [activeTab])

  // 缩进改变时，设置菜单缩进（通过cuurentCollpase设置是因为：如果不设置，在缩进菜单时选中的子级菜单会悬浮，不会缩进）
  const collapse: boolean = useMappedState(state => state.collapse);
  const [cuurentCollpase, setcuurentCollpase] = useState(collapse)
  useEffect(() => {
    currentSetMenuPath()
    setcuurentCollpase(collapse);
  }, [collapse])

  // 根据缩进设置菜单路径
  const currentSetMenuPath = () => {
    const menuPath = collapse ? [] : getMenuPath(activeTab);
    setmenuPath(menuPath)
  }

  // 点击没有子级的菜单
  const menuSelect = (menu: route) => {
    dispatch(setTab(menu));
  }
  // 	点击有子级的菜单
  const openChange = (openKeys: string[]) => {
    setmenuPath(openKeys)
  }
  // 菜单渲染
  const menusDom = (menus: routes) => {
    return menus.map(menu => {
      if (!menu.children) {
        // 没有子级
        return <Menu.Item key={menu.id} onClick={() => menuSelect(menu)}>
          <Link to={menu.path!}><Icon type={menu.icon} /> <span>{menu.title}</span></Link>
        </Menu.Item>
      } else {
        // 有子级
        return <SubMenu
          key={menu.id}
          title={
            <>
              <Icon type={menu.icon} />
              <span> {menu.title} </span>
            </>
          }
        >
          {menusDom(menu.children)}
        </SubMenu>
      }
    })
  }


  return (
    <Sider width={256} collapsed={cuurentCollpase} className="aside">
      <Menu selectedKeys={[activeTab]} openKeys={menuPath} mode="inline" theme="dark" onOpenChange={openChange}>
        <AsideHeader collapse={collapse}></AsideHeader>
        {menusDom(menus)}
      </Menu>
    </Sider>
  )
}


export default Aside;
