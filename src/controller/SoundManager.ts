module game {
    class SoundComponent extends egret.DisplayObjectContainer {
        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this);
        }

        private musicBtns: eui.Group = new eui.Group();
        private musicOn: eui.Image = new eui.Image();
        private musicOff: eui.Image = new eui.Image();
        private btnWidth: number = 83;
        private btnHeight: number = 85;
        private btnPosX: number = 620;
        private btnPosY: number = 40;
        private addMusicBtneEvent(): void {

            // 点击打开
            this.musicOn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                this.musicBtns.removeChild(this.musicOn);
                this.musicBtns.addChild(this.musicOff);
                this.onTap(e);
            }, this);

            // 点击关闭
            this.musicOff.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                this.musicBtns.removeChild(this.musicOff);
                this.musicBtns.addChild(this.musicOn);
                this.onTap(e);
            }, this);
        }

        private addMusicBtns(): void {
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
        }

        private onAddtoStage() {
            this.startLoad();
        }

        private startLoad():void {
            //创建 URLLoader 对象
            var loader:egret.URLLoader = new egret.URLLoader();
            //设置加载方式为声音
            loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
            //添加加载完成侦听
            loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            //音频资源放在resource文件夹下
            var url:string = "bgm_mp3";
            var request:egret.URLRequest = new egret.URLRequest(url);
            //开始加载
            loader.load(request);
        }

        private onLoadComplete(event:egret.Event):void {
            var loader:egret.URLLoader = <egret.URLLoader>event.target;
            //获取加载到的 Sound 对象
            var sound:egret.Sound = <egret.Sound>loader.data;
            this.sound = sound;
        }
        private sound:egret.Sound;
        private soundChannel:egret.SoundChannel;

        private onTap(event:egret.Event){

            var sound = this.sound;
            var channel:egret.SoundChannel = this.soundChannel;
            if(channel){
                //调用soundChannel对象的stop方法停止播放音频
                console.log(channel);
                channel.stop();
                this.soundChannel = null;
                return;
            }
            //使用SoundChannel播放音频
            channel = sound.play(0,-1);
            //Egret 3.0.4 新增获取音频长度 length 属性。
            console.log(sound.length);
            channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            //保存soundChannel对象
            this.soundChannel = channel;
        }

        private onSoundComplete(event:egret.Event):void {
            // console.log("onSoundComplete");
        }
    }
}