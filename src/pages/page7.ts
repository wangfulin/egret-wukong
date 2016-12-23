// TypeScript file
module game {
    export class PageSeven extends eui.Component {
        public constructor() {
            super();
            this.skinName = 'page7';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.addToScene();
            this.initListener();
        }

        private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);
        private pagePopup: eui.Group;
        private pageSevenText: eui.Image;
        private pageSevenWantBtn: eui.Image;
        private pageSevenShareBtn: eui.Image;
        private ceoWithMoney: egret.MovieClip;
        private pageSevenShareHint: eui.Image;
        private pageMask: egret.Shape;

        // 把元素添加到页面
        private addToScene(): void {
            this.addCEO();
            this.createMask();
            // this.addShareHint();
            this.setShowPriority();
        }

        // 增加 CEO 拿钱诱惑的 gif
        private addCEO(): void {
            this.ceoWithMoney = MovieClipManager.getInstance().getMC('ceoWithMoney');
            this.addChild(this.ceoWithMoney);
            this.ceoWithMoney.gotoAndPlay(1, -1);
            this.ceoWithMoney.width = 430;
            this.ceoWithMoney.height = 579;
            this.ceoWithMoney.x = 0;
            this.ceoWithMoney.y = 30;
        }

        // 增加蒙层
        private createMask(): void {
            this.pageMask = new egret.Shape();
            this.pageMask.graphics.beginFill(0x000000);
            this.pageMask.graphics.drawRect(0, 0, 750, 1334);
            this.pageMask.graphics.endFill();
            this.pageMask.alpha = 0;
            this.addChild(this.pageMask);
        }

        // 添加分享提示
        private addShareHint(): void {
            Util.showObject(this.pageSevenShareHint, {});
        }

        // 设置优先级
        private setShowPriority(): void {
            this.setChildIndex(this.ceoWithMoney, 1);
            this.setChildIndex(this.pageSevenText, 2);
            this.setChildIndex(this.pagePopup, 3);
            this.setChildIndex(this.pageMask, 4);
            this.setChildIndex(this.pageSevenShareHint, 5);
        }

        private initListener(): void {
            this.pageSevenWantBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                // 跳转到公众号
                location.href = 'http://mp.weixin.qq.com/s/SHeCf6cc-I6ggAlCoWQgSg';
            }, this);

            this.pageSevenShareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                // 提示分享
                this.pageMask.alpha = .9;
                this.addShareHint();
            }, this);

            // 点击阴影，移除阴影
            this.pageMask.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                // this.removeChild(this.pageMask);
                this.pageMask.alpha = 0;
                this.pageSevenShareHint.alpha = 0;
            }, this);
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