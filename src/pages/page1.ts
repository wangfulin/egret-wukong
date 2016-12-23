// TypeScript file
module game {
    export class PageOne extends eui.Component {
        public constructor() {
            super();
            this.skinName = 'page1';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.setAnimation();
        }

        private pageOneDialog: eui.Image;
        private pageOneBtn: eui.Image;
        private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);

        public setAnimation(): void {
            Util.showDialog(this.pageOneDialog, {
                height: 263,
                width: 215,
                duration: 500
            });
            Util.shake(this.pageOneBtn);
        }

        
        //添加显示列表
        private onAdded(e: egret.Event) {
            this.sceneEvent.eventType = SceneEvent.GAME_PAGE2;
            this.sceneEvent.eventObj = this;
            this.pageOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }
        //移除显示列表
        private onRemoved(e: egret.Event) {

            this.pageOneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }


        private onStartGame(e: egret.TouchEvent) {
            ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        }
    }
}