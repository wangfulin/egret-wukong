// TypeScript file
var game;
(function (game) {
    var PageSeven = (function (_super) {
        __extends(PageSeven, _super);
        function PageSeven() {
            _super.call(this);
            this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            this.skinName = 'page7';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.addToScene();
            this.initListener();
        }
        var d = __define,c=PageSeven,p=c.prototype;
        // 把元素添加到页面
        p.addToScene = function () {
            this.addCEO();
            this.createMask();
            // this.addShareHint();
            this.setShowPriority();
        };
        // 增加 CEO 拿钱诱惑的 gif
        p.addCEO = function () {
            this.ceoWithMoney = game.MovieClipManager.getInstance().getMC('ceoWithMoney');
            this.addChild(this.ceoWithMoney);
            this.ceoWithMoney.gotoAndPlay(1, -1);
            this.ceoWithMoney.width = 430;
            this.ceoWithMoney.height = 579;
            this.ceoWithMoney.x = 0;
            this.ceoWithMoney.y = 30;
        };
        // 增加蒙层
        p.createMask = function () {
            this.pageMask = new egret.Shape();
            this.pageMask.graphics.beginFill(0x000000);
            this.pageMask.graphics.drawRect(0, 0, 750, 1334);
            this.pageMask.graphics.endFill();
            this.pageMask.alpha = 0;
            this.addChild(this.pageMask);
        };
        // 添加分享提示
        p.addShareHint = function () {
            game.Util.showObject(this.pageSevenShareHint, {});
        };
        // 设置优先级
        p.setShowPriority = function () {
            this.setChildIndex(this.ceoWithMoney, 1);
            this.setChildIndex(this.pageSevenText, 2);
            this.setChildIndex(this.pagePopup, 3);
            this.setChildIndex(this.pageMask, 4);
            this.setChildIndex(this.pageSevenShareHint, 5);
        };
        p.initListener = function () {
            var _this = this;
            this.pageSevenWantBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                // 跳转到公众号
                location.href = 'http://mp.weixin.qq.com/s/SHeCf6cc-I6ggAlCoWQgSg';
            }, this);
            this.pageSevenShareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                // 提示分享
                _this.pageMask.alpha = .9;
                _this.addShareHint();
            }, this);
            // 点击阴影，移除阴影
            this.pageMask.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                // this.removeChild(this.pageMask);
                _this.pageMask.alpha = 0;
                _this.pageSevenShareHint.alpha = 0;
            }, this);
        };
        //添加显示列表
        p.onAdded = function (e) {
            this.sceneEvent.eventType = game.SceneEvent.GAME_PAGE5;
            this.sceneEvent.eventObj = this;
            // this.pageOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        //移除显示列表
        p.onRemoved = function (e) {
            // this.pageThreeCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        // 跳转到下一个页面
        p.onNextPage = function () {
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return PageSeven;
    }(eui.Component));
    game.PageSeven = PageSeven;
    egret.registerClass(PageSeven,'game.PageSeven');
})(game || (game = {}));
//# sourceMappingURL=page7.js.map