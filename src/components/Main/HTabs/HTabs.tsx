import React, { useEffect } from 'react'

import { Tabs } from 'antd';

import { useMappedState, useDispatch } from 'redux-react-hook'

import { setTab, delTab } from "@/redux/actions"

import history from "@/router/history"
import { flatRoutes } from "@/router";

const { TabPane } = Tabs;

const HTabs: React.FC = () => {
  const tabsData = useMappedState(state => state.tabs);
  const tabs: routes = tabsData.list;
  const activeTab: string = tabsData.activeTab;
  const dispatch = useDispatch();

  // 跳转路由
  useEffect(() => {
    const activeTabItem = flatRoutes.find(route => route.id === activeTab)!;
    history.push(activeTabItem.path!);

  }, [activeTab])

  // 删除
  const remove = (targetKey: string | React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(delTab(targetKey as string));
  };

  // 选中
  const onChange = (activeKey: string) => {
    const activeTab = flatRoutes.find(route => route.id === activeKey)!;
    dispatch(setTab(activeTab));
  };


  // 编辑（实际上只用到删除）
  const onEdit = (targetKey: string | React.MouseEvent<HTMLElement, MouseEvent>, action: "add" | "remove") => {
    if (action === 'add') {
      return;
    } else {
      remove(targetKey)
    }
  };
  return (
    <div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeTab}
        type="editable-card"
        onEdit={onEdit}
      >
        {tabs.map(pane => (
          // 只展示标签页，不展示标签内容
          <TabPane tab={pane.title} key={pane.id}></TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default HTabs;