import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: require('@/pages/Index').default,
            meta: {
                title: "首页",
                index: 1
            }
        },
        {
            path: '*',
            redirect: '/',
            meta: {
                index: 0,
                title: "首页"
            }
        },
        {
            path: '/result',
            name: 'searchResult',
            component: require("@/pages/SearchResult").default,
            meta: {
                index: 2,
                title: "搜索结果"
            }
        },
        {
            path: '/bookinfo',
            name: 'bookinfo',
            component: require("@/pages/BookInfo").default,
            meta: {
                index: 3,
                title: "书籍详情"
            }
        },
        {
            path: '/chapter',
            name: 'chapter',
            component: require("@/pages/Chapter").default,
            meta: {
                index: 4,
                title: "章节"
            }
        },
        {
            path: '/cat',
            name: 'cat',
            component: require("@/pages/Cat").default,
            meta: {
                index: 5,
                title: "分类"
            }
        },
        {
            path: '/catlist',
            name: 'catlist',
            component: require("@/pages/Catlist").default,
            meta: {
                index: 6,
                title: "分类列表"
            }
        },
        {
            path: '/sort',
            name: 'sort',
            component: require("@/pages/Sort").default,
            meta: {
                index: 7,
                title: "排行榜"
            }
        },
        {
            path: '/setting',
            name: 'setting',
            component: require("@/pages/Setting").default,
            meta: {
                index: 8,
                title: "设置"
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    localStorage.setItem("nextRouteIndex", to.meta.index);
    localStorage.setItem("prevRouteIndex", from.meta.index);
    document.title = to.meta.title;
    next();
});
