// TypeScript file
var game;
(function (game) {
    var PageTwo = (function (_super) {
        __extends(PageTwo, _super);
        function PageTwo() {
            _super.call(this);
            this.spotLight = game.MovieClipManager.getInstance().getMC('spotLight');
            this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            this.skinName = 'page2';
            this.addToScene();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.setAnimation();
        }
        var d = __define,c=PageTwo,p=c.prototype;
        // 添加到场景中
        p.addToScene = function () {
            this.spotLight.alpha = 0;
            this.addChild(this.spotLight);
            this.createMask();
        };
        // 添加遮罩
        p.createMask = function () {
            this.pageMask = new egret.Shape();
            this.pageMask.graphics.beginFill(0x000000);
            this.pageMask.graphics.drawRect(0, 0, 750, 1334);
            this.pageMask.graphics.endFill();
            this.pageMask.alpha = .6;
            this.addChild(this.pageMask);
            // 重设显示对象的深度
            this.setChildIndex(this.pageMask, 1);
            this.setChildIndex(this.pageTwoLightLeft, 2);
            this.setChildIndex(this.pageTwoLightRight, 2);
            this.setChildIndex(this.spotLight, 3);
            this.setChildIndex(this.pageTwoDialog, 4);
        };
        // 第一步：出现灯光，移动灯光
        p.showSpotLight = function () {
            // 显示光束
            var self = this;
            game.Util.showObject(this.pageTwoLightLeft, {
                duration: 500
            }, function () {
                game.Util.showObject(self.pageTwoLightRight, {
                    duration: 500,
                    delay: 500
                }, function () {
                    self.removeChild(self.pageTwoLightLeft);
                    self.removeChild(self.pageTwoLightRight);
                    self.moveLight();
                });
            });
        };
        // 移动灯光
        p.moveLight = function () {
            var _this = this;
            this.spotLight.alpha = 1;
            this.spotLight.gotoAndPlay(1, 2);
            var self = this;
            this.spotLight.addEventListener(egret.Event.COMPLETE, function (e) {
                // this.bearJumpOut(function() {
                //     // this.removeChild(spotLight);
                //     self.removeChild(self.pageTwoShaking);
                //     self.bearWelcome();
                // });
                _this.bearWelcome();
            }, this);
        };
        // 第三步: 跳出贝贝熊，贝贝熊欢迎张手动画
        p.bearWelcome = function () {
            var _this = this;
            var shakingBear = game.MovieClipManager.getInstance().getMC('shakingBear');
            var self = this;
            this.addChild(shakingBear);
            shakingBear.x = 750;
            shakingBear.y = 430;
            shakingBear.scaleX = .6;
            shakingBear.scaleY = .6;
            shakingBear.alpha = 0;
            // 跳出贝贝熊
            egret.Tween.get(shakingBear)
                .to({ alpha: 1, x: 286, y: 866 }, 500, egret.Ease.circIn)
                .call(function () {
                // 贝贝熊欢迎动画
                shakingBear.gotoAndPlay(1, 2);
            });
            shakingBear.addEventListener(egret.Event.COMPLETE, function (e) {
                egret.Tween.get(shakingBear).to({
                    alpha: 0
                }, 1000).call(function () {
                    self.removeChild(shakingBear);
                });
                // this.removeChild(shakingBear);
                _this.talkingAndShowDialog();
            }, this);
        };
        // 第四步：贝贝熊说话，弹出对话框
        p.talkingAndShowDialog = function () {
            var self = this;
            // 说话
            var standingBear = game.MovieClipManager.getInstance().getMC('standingBear');
            this.addChild(standingBear);
            standingBear.x = 240;
            standingBear.y = 870;
            standingBear.alpha = 0;
            standingBear.scaleX = .8;
            standingBear.scaleY = .8;
            standingBear.gotoAndPlay(1, 22);
            egret.Tween.get(standingBear).to({
                alpha: 1
            }, 600);
            standingBear.addEventListener(egret.Event.COMPLETE, function (e) {
                // this.removeChild(standingBear);
            }, this);
            // 弹出对话框
            game.Util.showDialog(this.pageTwoDialog, {
                width: 645,
                height: 385,
                delay: 4000
            }, function () {
                self.onStartGame();
            });
        };
        // 第五步：贝贝熊移动到下面，弹出弹窗
        p.setAnimation = function () {
            // 第一步
            this.showSpotLight();
            // 第三步
            // this.bearWelcome();
            // 第四步
            // this.talkingAndShowDialog();
        };
        //添加显示列表
        p.onAdded = function (e) {
            this.sceneEvent.eventType = game.SceneEvent.GAME_PAGE3;
            this.sceneEvent.eventObj = this;
        };
        //移除显示列表
        p.onRemoved = function (e) {
        };
        // 跳转到下一个页面
        p.onStartGame = function () {
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return PageTwo;
    }(eui.Component));
    game.PageTwo = PageTwo;
    egret.registerClass(PageTwo,'game.PageTwo');
})(game || (game = {}));
//# sourceMappingURL=page2.js.map