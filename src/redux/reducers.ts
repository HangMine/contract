import { combineReducers } from 'redux'
import history from '@/router/history';
import { platform } from "@/assets/js/check";
import { cache } from "@/assets/js/common"
import routes from "@/router"

interface action {
  type: string,
  [key: string]: any
}

type tabs = {
  list: routes,
  activeTab: string
}

interface initialProp {
  isMobile: boolean,
  url: string,
  collapse: boolean,
  tabs: tabs
  article: any,
  articleType: any
}

const initialState: initialProp = {
  isMobile: platform.isMobile,
  // 路由跳转的地址
  url: '',
  // 菜单是否缩进
  collapse: false,
  // 标签页数据(默认首页)
  tabs: cache.get('tabs') || { list: [routes[0]], activeTab: 'home' },
  article: {
    isFetching: false,
    list: []
  },
  articleType: {
    isFetching: false,
    list: []
  }
}

const isMobile = (state = initialState.isMobile) => {
  return state;
}

const collapse = (state = initialState.collapse, action: action) => {
  switch (action.type) {
    case 'SET_MENU_COLLAPSE':
      return action.collapse;

    default:
      return state;
  }
}

const tabs = (state = initialState.tabs, action: action) => {
  const tabs = state.list;
  let filterTabs;
  let resTabs;
  switch (action.type) {
    case 'SET_TAB':
      if (tabs.some(tab => tab.id === action.tab.id)) {
        // 标签页已经存在
        filterTabs = tabs;
      } else {
        // 新增标签页
        filterTabs = tabs.filter(item => item.id !== action.tab.id);
        filterTabs.push(action.tab);
      }

      resTabs = {
        list: filterTabs,
        activeTab: action.tab.id
      };

      // 设置到缓存
      cache.set('tabs', resTabs);

      return resTabs

    case 'DEL_TAB':
      // 当删除最后一个时，保留首页
      filterTabs = tabs.filter(item => item.id !== action.tabId);
      resTabs = {
        list: filterTabs.length && filterTabs || [routes[0]],
        activeTab: filterTabs.length && filterTabs[filterTabs.length - 1].id || 'home'
      };

      // 设置到缓存
      cache.set('tabs', resTabs);
      return resTabs

    default:
      return state;
  }
}

const article = (state = initialState.article, action: action) => {
  switch (action.type) {
    case "REQUEST_ARTICLE":
      return {
        ...state, ...{
          isFetching: true,
        }
      }
    case "RECEIVE_ARTICLE":
      return {
        isFetching: false,
        list: action.res.data.articles,
      }
    default:
      return state;
  }
}

const articleType = (state = initialState.articleType, action: action) => {
  switch (action.type) {
    case 'REQUEST_ARTICLE_TYPE':
      return {
        ...state,
        ...{ isFetching: true }
      }
    case 'RECEIVE_ARTICLE_TYPE':
      return {
        ...state,
        ...{
          isFetching: false,
          list: action.res.data.articleTypes
        }
      }
    default:
      return state;
  }
}

const app = combineReducers({
  isMobile,
  collapse,
  tabs,
  article,
  articleType
})
export default app