"use strict";
exports.__esModule = true;
exports.InitData = void 0;
// 回传页面的初始化数据类
var InitData = /** @class */ (function () {
    function InitData() {
        this.selectData = {
            roleId: 0,
            nickName: ''
        };
        // 接收用户信息列表
        this.userList = [];
        // 接收角色信息列表
        this.roleList = [];
        this.isShow = false;
        // 选中的对象
        this.activeUser = {
            id: 0,
            nickName: '',
            userName: '',
            role: []
        };
    }
    return InitData;
}());
exports.InitData = InitData;
