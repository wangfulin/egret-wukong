// TypeScript file
module game {
    export class PageThree extends eui.Component {
        public constructor() {
            super();
            this.skinName = 'page3';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.showTalkingBeibei();
            this.addMask();
            this.initListener();
        }

        private talkingBear: egret.MovieClip;
        private pageMask: egret.Shape;
        private pageThreeCloseBtn: eui.Image;
        private pageThreePopup: eui.Image;
        private timeoutId: number;
        private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);


        private initListener(): void {
            // 点击关闭，跳转到另一页
            this.pageThreeCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }

        // 增加遮罩
        private addMask(): void {
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
        }

        // 展示讲解内容的小熊
        private showTalkingBeibei():void {
            var self:PageThree = this;
            this.talkingBear = MovieClipManager.getInstance().getMC('talkingBear');
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
            }, 500, egret.Ease.circIn).call(function() {
                self.talkingBear.gotoAndPlay(1, 80);

                // 等待 5s 之后，如果没有任何操作就跳到另一页
                self.timeoutId = setTimeout(function() {
                    self.onStartGame();
                }, 9000);
            });
        }

         //添加显示列表
        private onAdded(e: egret.Event) {
            this.sceneEvent.eventType = SceneEvent.GAME_PAGE4;
            this.sceneEvent.eventObj = this;
            // this.pageOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }
        //移除显示列表
        private onRemoved(e: egret.Event) {
            this.pageThreeCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }


        private onStartGame() {
            clearTimeout(this.timeoutId);
            ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        }
    }
}