const routes: routes = [
  {
    id: 'home',
    title: '首页',
    icon: 'home',
    path: '/app/home'
  }, {
    id: 'views',
    title: '路由页面',
    icon: 'layout',
    children: [{
      id: 'view1',
      title: '页面1',
      icon: 'home',
      path: '/app/views/view1',
    }]
  }];

// 扁平化路由,方便获取菜单
const flatRoutes: routes = (() => {
  const allRoutes: routes = [];
  const flat = (_routes: routes) => {
    for (const route of _routes) {
      allRoutes.push(route);
      route.children && flat(route.children);
    }
  }
  flat(routes);
  return allRoutes;
})()

export { flatRoutes };

export default routes;