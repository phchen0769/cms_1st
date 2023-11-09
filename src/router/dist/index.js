"use strict";
exports.__esModule = true;
var vue_router_1 = require("vue-router");
var HomeView_vue_1 = require("../views/HomeView.vue");
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView_vue_1["default"],
            children: [
                {
                    path: 'goods',
                    name: 'goods',
                    meta: {
                        isShow: true,
                        title: '商品列表'
                    },
                    component: function () { return Promise.resolve().then(function () { return require('../views/GoodsView.vue'); }); }
                },
                {
                    path: 'users',
                    name: 'users',
                    meta: {
                        isShow: true,
                        title: '用户列表'
                    },
                    component: function () { return Promise.resolve().then(function () { return require('../views/UsersView.vue'); }); }
                },
            ]
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: function () { return Promise.resolve().then(function () { return require('../views/AboutView.vue'); }); }
        },
        // 编写LoginView子页面的路由信息
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: function () { return Promise.resolve().then(function () { return require('../views/LoginView.vue'); }); }
        },
    ]
});
exports["default"] = router;
