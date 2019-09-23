// rest请求
import http from "@/assets/js/http"

// 路由跳转
export const toRouter = (url: string) => {
  return { type: 'TO_ROUTER', url }
}

// 设置菜单是否缩进状态
export const setMenuCollapse = (collapse: boolean) => {
  return { type: 'SET_MENU_COLLAPSE', collapse }
}


// 设置标签页数据和当前标签页
export const setTab = (tab: route) => {
  return { type: "SET_TAB", tab }
}

// 删除标签页数据
export const delTab = (tabId: string) => {
  return { type: "DEL_TAB", tabId }
}

// 请求文章类型
export const requestArticleType = () => {
  return { type: 'REQUEST_ARTICLE_TYPE' }
}

export const receiveArticleType = (res: res) => {
  return { type: 'RECEIVE_ARTICLE_TYPE', res }
}

export const fetchArtcileType = (url: string = '/getArticleType') => {
  return (dispatch: dispatch) => {
    dispatch(requestArticleType());
    return http(url).then(res => dispatch(receiveArticleType(res)));
  }
}

// 请求文章
export const requestArticle = () => {
  return { type: 'REQUEST_ARTICLE' }
}

export const receiveArticle = (res: res) => {
  return { type: 'RECEIVE_ARTICLE', res }
}

export const fetchArtcile = (url: string = '/getArticle') => {
  return (dispatch: dispatch) => {
    dispatch(requestArticle());
    return http(url).then(res => dispatch(receiveArticle(res)));
  }
}

