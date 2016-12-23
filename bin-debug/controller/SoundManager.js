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
            this.btnHeight = 85;
            this.btnPosX = 620;
            this.btnPosY = 40;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        }
        var d = __define,c=SoundComponent,p=c.prototype;
        p.addMusicBtneEvent = function () {
            var _this = this;
            // 点击打开
            this.musicOn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                _this.musicBtns.removeChild(_this.musicOn);
                _this.musicBtns.addChild(_this.musicOff);
                _this.onTap(e);
            }, this);
            // 点击关闭
            this.musicOff.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                _this.musicBtns.removeChild(_this.musicOff);
                _this.musicBtns.addChild(_this.musicOn);
                _this.onTap(e);
            }, this);
        };
        p.addMusicBtns = function () {
            this.addChild(this.musicBtns);
            this.musicBtns.addChild(this.musicOn);
            this.musicBtns.addChild(this.musicOff);
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
        };
        p.onAddtoStage = function () {
            this.startLoad();
        };
        p.startLoad = function () {
            //创建 URLLoader 对象
            var loader = new egret.URLLoader();
            //设置加载方式为声音
            loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
            //添加加载完成侦听
            loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            //音频资源放在resource文件夹下
            var url = "bgm_mp3";
            var request = new egret.URLRequest(url);
            //开始加载
            loader.load(request);
        };
        p.onLoadComplete = function (event) {
            var loader = event.target;
            //获取加载到的 Sound 对象
            var sound = loader.data;
            this.sound = sound;
        };
        p.onTap = function (event) {
            var sound = this.sound;
            var channel = this.soundChannel;
            if (channel) {
                //调用soundChannel对象的stop方法停止播放音频
                console.log(channel);
                channel.stop();
                this.soundChannel = null;
                return;
            }
            //使用SoundChannel播放音频
            channel = sound.play(0, -1);
            //Egret 3.0.4 新增获取音频长度 length 属性。
            console.log(sound.length);
            channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            //保存soundChannel对象
            this.soundChannel = channel;
        };
        p.onSoundComplete = function (event) {
            // console.log("onSoundComplete");
        };
        return SoundComponent;
    }(egret.DisplayObjectContainer));
    egret.registerClass(SoundComponent,'SoundComponent');
})(game || (game = {}));
//# sourceMappingURL=SoundManager.js.map