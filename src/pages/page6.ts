// TypeScript file
module game {
    export class PageSix extends eui.Component {
        public constructor() {
            super();
            this.skinName = 'page6';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.addToScene();
            this.initListener();
        }

        private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);
        private pageSixBtn: eui.Image;
        private pageSixCloseBtn: eui.Image;
        private pageSixBg: eui.Image;
        private pageSixGroup: eui.Group;
        private pageSixScroller: eui.Scroller;

        private addToScene(): void {
            this.pageSixScroller.viewport = this.pageSixGroup;
        }

        private initListener(): void {
            this.pageSixBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextPage, this);
            this.pageSixCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextPage, this);
        }

        //添加显示列表
        private onAdded(e: egret.Event) {
            this.sceneEvent.eventType = SceneEvent.GAME_PAGE7;
            this.sceneEvent.eventObj = this;
            // this.pageOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }
        //移除显示列表
        private onRemoved(e: egret.Event) {
            // this.pageThreeCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }

        // 跳转到下一个页面
        private onNextPage(e: egret.Event) {
            ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        }
    }
}