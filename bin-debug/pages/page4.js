// TypeScript file
var game;
(function (game) {
    var PageFour = (function (_super) {
        __extends(PageFour, _super);
        function PageFour() {
            _super.call(this);
            this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            this.skinName = 'page4';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            var self = this;
            this.showCEODialog(function () {
                self.jumpOutBeibei(function () {
                    egret.Tween.get(self.ceoDialog).to({ alpha: 0 }, 300);
                    self.talkingBeibei.gotoAndPlay(1, 24);
                    self.showBeibeiDialog(function () {
                        self.onNextPage();
                    });
                });
            });
            // this.jumpOutBeibei(function() {
            //     self.talkingBeibei.gotoAndPlay(1, 24);
            //     self.showCEODialog(function() {
            //         self.showBeibeiDialog(function() {
            //             self.onNextPage();
            //         });
            //     });
            // });
        }
        var d = __define,c=PageFour,p=c.prototype;
        // 跳出贝贝熊
        p.jumpOutBeibei = function (cb) {
            this.talkingBeibei = game.MovieClipManager.getInstance().getMC('talkingBear');
            this.addChild(this.talkingBeibei);
            this.talkingBeibei.x = -300;
            this.talkingBeibei.y = 100;
            egret.Tween.get(this.talkingBeibei).to({
                x: 360,
                y: 500
            }, 300, egret.Ease.circIn).call(cb);
        };
        // 显示贝贝熊的对话框
        p.showBeibeiDialog = function (cb) {
            game.Util.showDialog(this.beibeiDialog, {
                width: 439,
                height: 256,
                delay: 2500
            }, cb);
        };
        // 显示 CE0 的对话
        p.showCEODialog = function (cb) {
            if (cb === void 0) { cb = function () { }; }
            game.Util.showObject(this.ceoDialog, {
                width: 678,
                height: 228,
                duration: 1000,
                delay: 2000
            }, cb);
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
        return PageFour;
    }(eui.Component));
    game.PageFour = PageFour;
    egret.registerClass(PageFour,'game.PageFour');
})(game || (game = {}));
//# sourceMappingURL=page4.js.map