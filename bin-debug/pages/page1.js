// TypeScript file
var game;
(function (game) {
    var PageOne = (function (_super) {
        __extends(PageOne, _super);
        function PageOne() {
            _super.call(this);
            this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            this.skinName = 'page1';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.setAnimation();
        }
        var d = __define,c=PageOne,p=c.prototype;
        p.setAnimation = function () {
            game.Util.showDialog(this.pageOneDialog, {
                height: 263,
                width: 215,
                duration: 500
            });
            game.Util.shake(this.pageOneBtn);
        };
        //添加显示列表
        p.onAdded = function (e) {
            this.sceneEvent.eventType = game.SceneEvent.GAME_PAGE2;
            this.sceneEvent.eventObj = this;
            this.pageOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        //移除显示列表
        p.onRemoved = function (e) {
            this.pageOneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        p.onStartGame = function (e) {
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return PageOne;
    }(eui.Component));
    game.PageOne = PageOne;
    egret.registerClass(PageOne,'game.PageOne');
})(game || (game = {}));
//# sourceMappingURL=page1.js.map