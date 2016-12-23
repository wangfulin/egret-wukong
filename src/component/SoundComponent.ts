module game {
    export class SoundComponent extends egret.DisplayObjectContainer {
        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this);
            // this.startLoad();   
        }

        private musicBtns: eui.Group = new eui.Group();
        private musicOn: eui.Image = new eui.Image();
        private musicOff: eui.Image = new eui.Image();
        private btnWidth: number = 83;
        private btnHeight: number = 86;
        private btnPosX: number = 10;
        private btnPosY: number = 70;
        private musicStatus = 'on';

        private addMusicEvents(): void {

            // 点击打开
            this.musicOn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                if(this.musicStatus == 'on') {
                    if(this.musicBtns.contains(this.musicOff)) {
                        this.musicBtns.removeChild(this.musicOff);
                    }
                    
                    this.musicBtns.addChild(this.musicOff);
                    window['setBgm'](false);
                    this.musicStatus = 'off';
                    // this.onTap(e);
                }
            }, this);

            // 点击关闭
            this.musicOff.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                if(this.musicStatus == 'off') {
                    if(this.musicBtns.contains(this.musicOn)) {
                        this.musicBtns.removeChild(this.musicOn);
                    }
                    this.musicBtns.addChild(this.musicOn);
                    window['setBgm'](true);
                    this.musicStatus = 'on';
                    // this.onTap(e);
                }
            }, this);
        }

        private addMusicBtns(): void {
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
        }

        private onAddtoStage() {
            this.addMusicBtns();
            this.addMusicEvents();
        }

        // private startLoad():void {
        //     //创建 URLLoader 对象
        //     var loader:egret.URLLoader = new egret.URLLoader();
        //     //设置加载方式为声音
        //     loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //     //添加加载完成侦听
        //     loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //     //音频资源放在resource文件夹下
        //     var url:string = "resource/my-resources/audio/bgm.mp3";
        //     var request:egret.URLRequest = new egret.URLRequest(url);
        //     //开始加载
        //     loader.load(request);
        // }

        // private onLoadComplete(event:egret.Event):void {
        //     var loader:egret.URLLoader = <egret.URLLoader>event.target;
        //     //获取加载到的 Sound 对象
        //     var sound:egret.Sound = <egret.Sound>loader.data;
        //     this.sound = sound;
        //     this.onTap(event);
        //     if(this.musicStatus == 'off') {
        //         this.musicBtns.addChild(this.musicOn);
        //         this.musicBtns.addChild(this.musicOff);
        //     } else {
        //         this.musicBtns.addChild(this.musicOff);
        //         this.musicBtns.addChild(this.musicOn);
        //     }
        // }
        // private sound:egret.Sound;
        // private soundChannel:egret.SoundChannel;

        // private onTap(event:egret.Event){

        //     var sound = this.sound;
        //     var channel:egret.SoundChannel = this.soundChannel;
        //     if(channel){
        //         //调用soundChannel对象的stop方法停止播放音频
        //         channel.stop();
        //         this.musicStatus = 'off';
        //         this.soundChannel = null;
        //         return;
        //     }
        //     //使用SoundChannel播放音频
        //     channel = sound.play(0,-1);
        //     this.musicStatus = 'on';
        //     //Egret 3.0.4 新增获取音频长度 length 属性。
        //     channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        //     //保存soundChannel对象
        //     this.soundChannel = channel;
        // }

        // private onSoundComplete(event:egret.Event):void {
        //     // console.log("onSoundComplete");
        // }
    }
}