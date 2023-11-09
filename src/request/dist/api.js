"use strict";
exports.__esModule = true;
exports.getRoleList = exports.getUserList = exports.getGoodsList = exports.login = void 0;
var _1 = require(".");
// interface LoginFormInt {
//   username: string;
//   password: string;
// }
// 登录接口
function login(data) {
    return _1["default"]({
        url: '/login',
        method: 'post',
        data: data
    });
}
exports.login = login;
// 商品列表接口
function getGoodsList() {
    return _1["default"]({
        url: '/getGoodsList',
        method: 'get'
    });
}
exports.getGoodsList = getGoodsList;
// 用户列表接口
function getUserList() {
    return _1["default"]({
        url: '/getUserList',
        method: 'get'
    });
}
exports.getUserList = getUserList;
// 角色列表接口
function getRoleList() {
    return _1["default"]({
        url: '/getRoleList',
        method: 'get'
    });
}
exports.getRoleList = getRoleList;
