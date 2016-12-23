var game;
(function (game) {
    /**
     *
     * @author xsstomy
     * 场景舞台，这里是我个人设定的为舞台
     */
    var ViewManager = (function (_super) {
        __extends(ViewManager, _super);
        function ViewManager() {
            _super.call(this);
        }
        var d = __define,c=ViewManager,p=c.prototype;
        //获取单例
        ViewManager.getInstance = function () {
            if (ViewManager.instance == null) {
                ViewManager.instance = new ViewManager();
            }
            return ViewManager.instance;
        };
        //开始
        p.start = function () {
            this.init();
            this.initListener();
        };
        //初始化数据
        p.init = function () {
            this.pageOne = new game.PageOne();
            // this.pageTwo = new PageTwo();
            // this.pageFive = new PageFive();
            // this.pageSix = new PageSix();
            // this.pageSeven = new PageSeven();
            this.addChild(this.pageOne);
        };
        //初始化事件监听
        p.initListener = function () {
            this.addEventListener(game.SceneEvent.ChangeScene, this.onChangeScene, this);
        };
        p.onChangeScene = function (e) {
            //移除所有子对象
            // this.removeChildren();
            //判断事件，接下来添加哪个场景在舞台展现
            switch (e.eventType) {
                case game.SceneEvent.GAME_PAGE1:
                    this.addChild(this.pageOne);
                    break;
                case game.SceneEvent.GAME_PAGE2:
                    this.removeChild(this.pageOne);
                    this.pageTwo = new game.PageTwo();
                    this.addChild(this.pageTwo);
                    break;
                case game.SceneEvent.GAME_PAGE3:
                    this.removeChild(this.pageTwo);
                    this.pageThree = new game.PageThree();
                    this.addChild(this.pageThree);
                    break;
                case game.SceneEvent.GAME_PAGE4:
                    this.removeChild(this.pageThree);
                    this.pageFour = new game.PageFour();
                    this.addChild(this.pageFour);
                    break;
                case game.SceneEvent.GAME_PAGE5:
                    this.removeChild(this.pageFour);
                    this.pageFive = new game.PageFive();
                    this.addChild(this.pageFive);
                    break;
                case game.SceneEvent.GAME_PAGE6:
                    this.removeChild(this.pageFive);
                    this.pageSix = new game.PageSix();
                    this.addChild(this.pageSix);
                    break;
                case game.SceneEvent.GAME_PAGE7:
                    this.removeChild(this.pageSix);
                    this.pageSeven = new game.PageSeven();
                    this.addChild(this.pageSeven);
                    break;
                default: break;
            }
        };
        return ViewManager;
    }(egret.Sprite));
    game.ViewManager = ViewManager;
    egret.registerClass(ViewManager,'game.ViewManager');
})(game || (game = {}));
//# sourceMappingURL=ViewManager.js.map