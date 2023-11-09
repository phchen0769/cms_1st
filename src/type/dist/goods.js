"use strict";
exports.__esModule = true;
exports.InitData = void 0;
var InitData = /** @class */ (function () {
    function InitData() {
        this.selectData = {
            title: '',
            introduce: '',
            page: 1,
            count: 0,
            pageSize: 10
        };
        // 展示的内容数据
        this.list = [];
    }
    return InitData;
}());
exports.InitData = InitData;
