// TypeScript file
module game {
    export class PageFour extends eui.Component {
        public constructor() {
            super();
            this.skinName = 'page4';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            var self = this;

            this.showCEODialog(function() {
                self.jumpOutBeibei(function() {
                    egret.Tween.get(self.ceoDialog).to({alpha: 0}, 300);
                    self.talkingBeibei.gotoAndPlay(1, 24);
                    self.showBeibeiDialog(function() {
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

        private beibeiDialog: eui.Image;
        private ceoDialog: eui.Image;
        private talkingBeibei: egret.MovieClip;
        private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);

        // 跳出贝贝熊
        private jumpOutBeibei(cb: Function): void {
            this.talkingBeibei = MovieClipManager.getInstance().getMC('talkingBear');
            this.addChild(this.talkingBeibei);
            this.talkingBeibei.x = -300;
            this.talkingBeibei.y = 100;
            egret.Tween.get(this.talkingBeibei).to({
                x: 360,
                y: 500
            }, 300, egret.Ease.circIn).call(cb);
        }

        // 显示贝贝熊的对话框
        private showBeibeiDialog(cb: Function): void {
            Util.showDialog(this.beibeiDialog, {
                width: 439,
                height: 256,
                delay: 2500
            }, cb);
        }

        // 显示 CE0 的对话
        private showCEODialog(cb: Function = function() {}): void {
            Util.showObject(this.ceoDialog, {
                width: 678,
                height: 228,
                duration: 1000,
                delay: 2000
            }, cb);
        }

        //添加显示列表
        private onAdded(e: egret.Event) {
            this.sceneEvent.eventType = SceneEvent.GAME_PAGE5;
            this.sceneEvent.eventObj = this;
            // this.pageOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }
        //移除显示列表
        private onRemoved(e: egret.Event) {
            // this.pageThreeCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }

        // 跳转到下一个页面
        private onNextPage() {
            ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        }
    }
}