module game {
	/**
	 *
	 * @author xsstomy
	 * 场景舞台，这里是我个人设定的为舞台
	 */
    export class ViewManager extends egret.Sprite {
        public constructor() {
            super();
        }

        private static instance: ViewManager;
        private pageOne: PageOne;
        private pageTwo: PageTwo;
        private pageThree: PageThree;
        private pageFour: PageFour;
        private pageFive: PageFive;
        private pageSix: PageSix;
        private pageSeven: PageSeven;

        //获取单例
        public static getInstance(): ViewManager {
            if (ViewManager.instance == null) {
                ViewManager.instance = new ViewManager();
            }
            return ViewManager.instance;
        }
        
        //开始
        public start() {
            this.init();

            this.initListener();
        }

        //初始化数据
        private init() {
            this.pageOne = new PageOne();
            // this.pageTwo = new PageTwo();
            // this.pageFive = new PageFive();
            // this.pageSix = new PageSix();
            // this.pageSeven = new PageSeven();

            this.addChild(this.pageOne);
        }
        
        //初始化事件监听
        private initListener() {

            this.addEventListener(SceneEvent.ChangeScene, this.onChangeScene, this);
        }
        private onChangeScene(e: SceneEvent) {
            
            //移除所有子对象
            // this.removeChildren();
            
            //判断事件，接下来添加哪个场景在舞台展现
            switch (e.eventType) {
                case SceneEvent.GAME_PAGE1:
                    this.addChild(this.pageOne);
                    break;

                case SceneEvent.GAME_PAGE2:
                    this.removeChild(this.pageOne);
                    this.pageTwo = new PageTwo();
                    this.addChild(this.pageTwo);
                    break;

                case SceneEvent.GAME_PAGE3:
                    this.removeChild(this.pageTwo);
                    this.pageThree = new PageThree();
                    this.addChild(this.pageThree);
                    break;

                case SceneEvent.GAME_PAGE4:
                    this.removeChild(this.pageThree);
                    this.pageFour = new PageFour();
                    this.addChild(this.pageFour);
                    break;

                case SceneEvent.GAME_PAGE5:
                    this.removeChild(this.pageFour);
                    this.pageFive = new PageFive();
                    this.addChild(this.pageFive);
                    break;
                
                case SceneEvent.GAME_PAGE6:
                    this.removeChild(this.pageFive);
                    this.pageSix = new PageSix();
                    this.addChild(this.pageSix);
                    break;

                case SceneEvent.GAME_PAGE7:
                    this.removeChild(this.pageSix);
                    this.pageSeven = new PageSeven();
                    this.addChild(this.pageSeven);
                    break;
                default: break;
            }
        }
    }
}
