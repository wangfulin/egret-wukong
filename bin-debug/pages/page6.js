// TypeScript file
var game;
(function (game) {
    var PageSix = (function (_super) {
        __extends(PageSix, _super);
        function PageSix() {
            _super.call(this);
            this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            this.skinName = 'page6';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.addToScene();
            this.initListener();
        }
        var d = __define,c=PageSix,p=c.prototype;
        p.addToScene = function () {
            this.pageSixScroller.viewport = this.pageSixGroup;
        };
        p.initListener = function () {
            this.pageSixBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextPage, this);
            this.pageSixCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextPage, this);
        };
        //添加显示列表
        p.onAdded = function (e) {
            this.sceneEvent.eventType = game.SceneEvent.GAME_PAGE7;
            this.sceneEvent.eventObj = this;
            // this.pageOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        //移除显示列表
        p.onRemoved = function (e) {
            // this.pageThreeCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        // 跳转到下一个页面
        p.onNextPage = function (e) {
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return PageSix;
    }(eui.Component));
    game.PageSix = PageSix;
    egret.registerClass(PageSix,'game.PageSix');
})(game || (game = {}));
//# sourceMappingURL=page6.js.map