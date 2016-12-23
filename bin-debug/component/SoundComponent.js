var game;
(function (game) {
    var SoundComponent = (function (_super) {
        __extends(SoundComponent, _super);
        function SoundComponent() {
            _super.call(this);
            this.musicBtns = new eui.Group();
            this.musicOn = new eui.Image();
            this.musicOff = new eui.Image();
            this.btnWidth = 83;
            this.btnHeight = 86;
            this.btnPosX = 10;
            this.btnPosY = 70;
            this.musicStatus = 'on';
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
            // this.startLoad();   
        }
        var d = __define,c=SoundComponent,p=c.prototype;
        p.addMusicEvents = function () {
            var _this = this;
            // 点击打开
            this.musicOn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (_this.musicStatus == 'on') {
                    if (_this.musicBtns.contains(_this.musicOff)) {
                        _this.musicBtns.removeChild(_this.musicOff);
                    }
                    _this.musicBtns.addChild(_this.musicOff);
                    window['setBgm'](false);
                    _this.musicStatus = 'off';
                }
            }, this);
            // 点击关闭
            this.musicOff.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (_this.musicStatus == 'off') {
                    if (_this.musicBtns.contains(_this.musicOn)) {
                        _this.musicBtns.removeChild(_this.musicOn);
                    }
                    _this.musicBtns.addChild(_this.musicOn);
                    window['setBgm'](true);
                    _this.musicStatus = 'on';
                }
            }, this);
        };
        p.addMusicBtns = function () {
            this.addChild(this.musicBtns);
            this.musicOn.source = 'music-on_png';
            this.musicOn.x = this.btnPosX;
            this.musicOn.y = this.btnPosY;
            this.musicOn.width = this.btnWidth;
            this.musicOn.height = this.btnHeight;
            this.musicOff.source = 'music-off_png';
            this.musicOff.x = this.btnPosX;
            this.musicOff.y = this.btnPosY;
            this.musicOff.width = this.btnWidth;
            this.musicOff.height = this.btnHeight;
            this.musicBtns.addChild(this.musicOff);
            this.musicBtns.addChild(this.musicOn);
        };
        p.onAddtoStage = function () {
            this.addMusicBtns();
            this.addMusicEvents();
        };
        return SoundComponent;
    }(egret.DisplayObjectContainer));
    game.SoundComponent = SoundComponent;
    egret.registerClass(SoundComponent,'game.SoundComponent');
})(game || (game = {}));
//# sourceMappingURL=SoundComponent.js.map