// TypeScript file
var game;
(function (game) {
    var PageThree = (function (_super) {
        __extends(PageThree, _super);
        function PageThree() {
            _super.call(this);
            this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            this.skinName = 'page3';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.showTalkingBeibei();
            this.addMask();
            this.initListener();
        }
        var d = __define,c=PageThree,p=c.prototype;
        p.initListener = function () {
            // 点击关闭，跳转到另一页
            this.pageThreeCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        // 增加遮罩
        p.addMask = function () {
            this.pageMask = new egret.Shape();
            this.pageMask.graphics.beginFill(0x000000);
            this.pageMask.graphics.drawRect(0, 0, 750, 1334);
            this.pageMask.graphics.endFill();
            this.pageMask.alpha = .6;
            this.addChild(this.pageMask);
            this.setChildIndex(this.pageThreeCloseBtn, 4);
            this.setChildIndex(this.talkingBear, 3);
            this.setChildIndex(this.pageThreePopup, 2);
            this.setChildIndex(this.pageMask, 1);
        };
        // 展示讲解内容的小熊
        p.showTalkingBeibei = function () {
            var self = this;
            this.talkingBear = game.MovieClipManager.getInstance().getMC('talkingBear');
            this.addChild(this.talkingBear);
            this.talkingBear.x = 100;
            this.talkingBear.y = 10;
            this.talkingBear.scaleX = .8;
            this.talkingBear.scaleY = .8;
            this.talkingBear.alpha = 0;
            egret.Tween.get(this.talkingBear).to({
                alpha: 1,
                x: 460,
                y: 920
            }, 500, egret.Ease.circIn).call(function () {
                self.talkingBear.gotoAndPlay(1, 80);
                // 等待 5s 之后，如果没有任何操作就跳到另一页
                self.timeoutId = setTimeout(function () {
                    self.onStartGame();
                }, 9000);
            });
        };
        //添加显示列表
        p.onAdded = function (e) {
            this.sceneEvent.eventType = game.SceneEvent.GAME_PAGE4;
            this.sceneEvent.eventObj = this;
            // this.pageOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        //移除显示列表
        p.onRemoved = function (e) {
            this.pageThreeCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        p.onStartGame = function () {
            clearTimeout(this.timeoutId);
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return PageThree;
    }(eui.Component));
    game.PageThree = PageThree;
    egret.registerClass(PageThree,'game.PageThree');
})(game || (game = {}));
//# sourceMappingURL=page3.js.map