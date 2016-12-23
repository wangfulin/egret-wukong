// TypeScript file
module game {
    export class PageFive extends eui.Component {
        public constructor() {
            super();
            this.skinName = 'page5';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.arrowHint();
            this.addAllGifToContainer();
            this.makeGifMove();
            // this.oxTalking();
            this.bearWalking();
            this.ceoWalking();
            this.addListener();

            // 进入的时候，左右按钮动一下
            egret.Tween.get(this.pageFiveLeftBtn)
                .to({
                    scaleX: 1.3,
                    scaleY: 1.3
                }, 500)
                .to({
                    scaleX: 1,
                    scaleY: 1
                }, 500)
                .to({
                    scaleX: 1.3,
                    scaleY: 1.3
                }, 500)
                .to({
                    scaleX: 1,
                    scaleY: 1
                }, 500);

            egret.Tween.get(this.pageFiveRightBtn)
                .to({
                    scaleX: 1.3,
                    scaleY: 1.3
                }, 500)
                .to({
                    scaleX: 1,
                    scaleY: 1
                }, 500)
                .to({
                    scaleX: 1.3,
                    scaleY: 1.3
                }, 500)
                .to({
                    scaleX: 1,
                    scaleY: 1
                }, 500);
        }

        private pageFiveBg: eui.Group;
        private pageFiveLeftBtn: eui.Image;
        private pageFiveRightBtn: eui.Image;
        private pageFiveArrow: eui.Image;
        private walkingBear: egret.MovieClip;
        private walkingCEO: egret.MovieClip;
        // private talkingOx: egret.MovieClip;

        // gif 容器
        private talkingOxContainer: eui.Group;
        private momAndKidContainer: eui.Group;
        private kidContainer: eui.Group;
        private friedChickenContainer: eui.Group;
        private balloonContainer: eui.Group;
        private programmerContainer: eui.Group;
        private announcement: eui.Image;

        // 对话框1，2，3，4,ceo对话框
        private pageFiveDialogCEO: eui.Image;
        private pageFiveDialogOne: eui.Image;
        private pageFiveDialogTwo: eui.Image;
        private pageFiveDialogThree: eui.Image;
        private pageFiveDialogFour: eui.Image;

        // 问题1
        private question1: eui.Group;
        private pageFiveQuestion1: eui.Image;
        private pageFiveMarsLanguage: eui.Image;
        private pageFivePhp: eui.Image;

        // 问题2
        private question2: eui.Group;
        private pageFiveQuestion2: eui.Image;
        private pageFiveMean: eui.Image;
        private pageFiveNaked: eui.Image;

        // 答题状态: notStart, success, fail, complete
        private answerState: string = 'notStart';
        private isOxClicked = false;
        private isRightArrowHintRemoved = false;
        private questionNum = 0;

        // 答题成功的弹窗
        private winPopup: eui.Group;
        private pageFiveWinPopup: eui.Image;
        private pageFiveWinBtn: eui.Image;

        private minRight = -4700;
        private maxRight = 600;
        private startTime: number;
        private pageMask: egret.Shape;

        private isCEODialogShowed: boolean = false;

        private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);

        // 默认是静止状态
        private direction: string = 'stand';

        // 行走速度
        private speed: number = 16;

        // 增加蒙层
        private createMask(): void {
            this.pageMask = new egret.Shape();
            this.pageMask.graphics.beginFill(0x000000);
            this.pageMask.graphics.drawRect(0, 0, 750, 1334);
            this.pageMask.graphics.endFill();
            this.pageMask.alpha = .6;
            this.addChild(this.pageMask);
        }

        private magnifyBtn(btn: eui.Image): void {
            btn.scaleX = 1.1;
            btn.scaleY = 1.1;
        }

        private resetBtn(btn: eui.Image): void {
            btn.scaleX = 1;
            btn.scaleY = 1;
        }

        // 绑定左右箭头的事件
        private addListener(): void {
            // this.pageFiveLeftBtn.addEventListener(egret.TouchEvent.FOCUS_OUT, (e: egret.Event) => {
            //     this.direction = 'left';
            //     this.resetBtn(this.pageFiveLeftBtn);
            //     this.stopMove();
            // }, this);

            // this.pageFiveLeftBtn.addEventListener(egret.TouchEvent.FOCUS_IN, (e: egret.Event) => {
            //     this.direction = 'left';
            //     this.magnifyBtn(this.pageFiveLeftBtn);
            //     this.beginMove();
            // }, this);

            this.pageFiveLeftBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.Event) => {
                // 往左走
                this.direction = 'left';
                this.magnifyBtn(this.pageFiveLeftBtn);
                this.beginMove();
            }, this);

            this.pageFiveLeftBtn.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.Event) => {
                // 停止
                this.direction = 'stand';
                this.resetBtn(this.pageFiveLeftBtn);
                this.stopMove();
            }, this);

            // this.pageFiveRightBtn.addEventListener(egret.TouchEvent.FOCUS_OUT, (e: egret.Event) => {
            //     this.direction = 'right';
            //     this.resetBtn(this.pageFiveLeftBtn);
            //     this.stopMove();
            // }, this);

            // this.pageFiveRightBtn.addEventListener(egret.TouchEvent.FOCUS_IN, (e: egret.Event) => {
            //     this.direction = 'right';
            //     this.magnifyBtn(this.pageFiveLeftBtn);
            //     this.beginMove();
            // }, this);

            this.pageFiveRightBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.Event) => {
                // 往右走
                this.direction = 'right';
                this.magnifyBtn(this.pageFiveRightBtn);
                this.beginMove();
            }, this);

            this.pageFiveRightBtn.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.Event) => {
                // 停止
                this.direction = 'stand';
                this.resetBtn(this.pageFiveRightBtn);
                this.stopMove();
            }, this);

            // 监听 左边按钮 tap 事件
            this.pageFiveLeftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                // 往左走
                if(!this.walkingBear.isPlaying && !this.walkingCEO.isPlaying) {
                    this.direction = 'left';
                    this.magnifyBtn(this.pageFiveLeftBtn);
                    this.onTap();
                }
            }, this);

            // 监听 右边按钮 tap 事件
            this.pageFiveRightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                // 往右走
                if(!this.walkingBear.isPlaying && !this.walkingCEO.isPlaying) {
                    this.direction = 'right';
                    this.magnifyBtn(this.pageFiveRightBtn);
                    this.onTap();
                }
            }, this);

            // 点击黄牛，黄牛说话
            this.talkingOxContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                var talkingOx: egret.MovieClip = <egret.MovieClip>this.talkingOxContainer.getChildAt(0);
                if(!talkingOx.isPlaying && !this.isOxClicked) {
                    this.isOxClicked = true;
                    this.removeChild(this.pageFiveArrow);
                    var self: PageFive = this;
                    this.showCEODialog(function() {
                        self.removeChild(self.pageMask);
                        self.removeChild(self.pageFiveDialogCEO);

                       talkingOx.gotoAndPlay(1, 10);

                        self.showDialog1(function() {
                            self.removeChild(self.pageFiveDialogOne);
                            self.removeChild(self.pageMask);
                            self.showQuestion1();
                        });
                    });
                }
                
            }, this);
        }

        // 显示对话1
        private showDialog1(cb): void {
            this.createMask();
            this.pageFiveDialogOne = new eui.Image();
            this.pageFiveDialogOne.source = 'page5-dialog1_png';
            this.addChild(this.pageFiveDialogOne);
            this.pageFiveDialogOne.alpha = 0;
            this.pageFiveDialogOne.width = 0;
            this.pageFiveDialogOne.height = 0;
            this.pageFiveDialogOne.x = 366;
            this.pageFiveDialogOne.y = 560;
            Util.showDialog(this.pageFiveDialogOne, {
                width: 662,
                height: 312,
                delay: 2400,
                duration: 300
            }, cb);
        }

        // 显示对话2
         private showDialog2(cb): void {
            this.createMask();
            this.pageFiveDialogTwo = new eui.Image();
            this.pageFiveDialogTwo.source = 'page5-dialog2_png';
            this.addChild(this.pageFiveDialogTwo);
            this.pageFiveDialogTwo.alpha = 0;
            this.pageFiveDialogTwo.width = 0;
            this.pageFiveDialogTwo.height = 0;
            this.pageFiveDialogTwo.x = 366;
            this.pageFiveDialogTwo.y = 560;
            Util.showDialog(this.pageFiveDialogTwo, {
                width: 662,
                height: 312,
                delay: 2400,
                duration: 300
            }, cb);
        }

        // 显示对话3
         private showDialog3(cb): void {
            this.createMask();
            this.pageFiveDialogThree = new eui.Image();
            this.pageFiveDialogThree.source = 'page5-dialog3_png';
            this.addChild(this.pageFiveDialogThree);
            this.pageFiveDialogThree.alpha = 0;
            this.pageFiveDialogThree.width = 0;
            this.pageFiveDialogThree.height = 0;
            this.pageFiveDialogThree.x = 366;
            this.pageFiveDialogThree.y = 560;
            Util.showDialog(this.pageFiveDialogThree, {
                width: 662,
                height: 312,
                delay: 2400,
                duration: 300
            }, cb);
        }

        // 显示对话4
        private showDialog4(cb): void {
            this.createMask();
            this.pageFiveDialogFour = new eui.Image();
            this.pageFiveDialogFour.source = 'page5-dialog4_png';
            this.addChild(this.pageFiveDialogFour);
            this.pageFiveDialogFour.alpha = 0;
            this.pageFiveDialogFour.width = 0;
            this.pageFiveDialogFour.height = 0;
            this.pageFiveDialogFour.x = 366;
            this.pageFiveDialogFour.y = 560;
            Util.showDialog(this.pageFiveDialogFour, {
                width: 662,
                height: 312,
                delay: 2400,
                duration: 300
            }, cb);
        }

        // 显示 ceo 对话
        private showCEODialog(cb: Function = function() {}): void {
            this.createMask();
            this.pageFiveDialogCEO = new eui.Image();
            this.pageFiveDialogCEO.source = 'page5-dialogCEO_png';
            this.addChild(this.pageFiveDialogCEO);
            this.pageFiveDialogCEO.alpha = 0;
            this.pageFiveDialogCEO.width = 0;
            this.pageFiveDialogCEO.height = 0;
            this.pageFiveDialogCEO.x = 300;
            this.pageFiveDialogCEO.y = 760;
            Util.showDialog(this.pageFiveDialogCEO, {
                width: 587,
                height: 342,
                delay: 2400,
                duration: 300
            }, cb);
        }

        // 显示问题1
        private showQuestion1(cb: Function = function() {}): void {
            this.createMask();
            this.question1 = new eui.Group();
            this.addChild(this.question1);
            this.question1.width = 687;
            this.question1.height = 755;
            this.question1.x = 16;
            this.question1.y = 180;
            this.question1.alpha = 0;
            this.pageFiveQuestion1 = new eui.Image();
            this.question1.addChild(this.pageFiveQuestion1);
            this.pageFiveQuestion1.source = 'page5-question1_png';
            this.pageFiveQuestion1.top = 0;
            this.pageFiveQuestion1.bottom = 0;
            this.pageFiveQuestion1.left = 0;
            this.pageFiveQuestion1.right = 0;
            this.pageFiveMarsLanguage = new eui.Image();
            this.pageFiveMarsLanguage.source = 'page5-marsLanguage_png';
            this.pageFiveMarsLanguage.width = 352;
            this.pageFiveMarsLanguage.height = 107;
            this.pageFiveMarsLanguage.x = 162;
            this.pageFiveMarsLanguage.y = 510;
            this.question1.addChild(this.pageFiveMarsLanguage);
            this.pageFivePhp = new eui.Image();
            this.pageFivePhp.source = 'page5-php_png';
            this.pageFivePhp.width = 352;
            this.pageFivePhp.height = 107;
            this.pageFivePhp.x = 162;
            this.pageFivePhp.y = 300;
            this.question1.addChild(this.pageFivePhp);

            this.question1.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                // 点击 问题1 php 按钮，回答正确
                if(e.target == this.pageFivePhp) {
                    var self:PageFive = this;
                    this.removeChild(this.question1);
                    this.removeChild(this.pageMask);

                    this.answerState = 'success';
                    this.showDialog3(function() {
                        self.removeChild(self.pageFiveDialogThree);
                        self.removeChild(self.pageMask);
                        self.showQuestion2();
                    });
                } 

                // 点击 问题1 火星语 按钮， 回答错误
                if(e.target == this.pageFiveMarsLanguage) {
                    this.removeChild(this.question1);
                    this.removeChild(this.pageMask);
                    var self: PageFive = this;
                    // this.question1.alpha = 0;
                    this.showDialog2(function() {
                        self.removeChild(self.pageFiveDialogTwo);
                        self.removeChild(self.pageMask);
                        self.showQuestion1();
                    });

                    this.answerState = 'fail';
                }
            }, this);

            Util.showObject(this.question1, {
                width: 687,
                height: 755,
                duration: 400
            }, cb);
        }

        // 显示问题2
        private showQuestion2(cb: Function = function() {}): void {
            this.createMask();
            this.question2 = new eui.Group();
            this.addChild(this.question2);
            this.question2.width = 687;
            this.question2.height = 755;
            this.question2.x = 16;
            this.question2.y = 180;
            this.question2.alpha = 0;
            this.pageFiveQuestion2 = new eui.Image();
            this.pageFiveQuestion2.source = 'page5-question2_png';
            this.pageFiveQuestion2.top = 0;
            this.pageFiveQuestion2.bottom = 0;
            this.pageFiveQuestion2.left = 0;
            this.pageFiveQuestion2.right = 0;
            this.question2.addChild(this.pageFiveQuestion2);
            this.pageFiveMean = new eui.Image();
            this.pageFiveMean.source = 'page5-mean_png';
            this.pageFiveMean.width = 352;
            this.pageFiveMean.height = 107;
            this.pageFiveMean.x = 162;
            this.pageFiveMean.y = 300;
            this.question2.addChild(this.pageFiveMean);
            this.pageFiveNaked = new eui.Image();
            this.pageFiveNaked.source = 'page5-naked_png';
            this.pageFiveNaked.width = 352;
            this.pageFiveNaked.height = 107;
            this.pageFiveNaked.x = 162;
            this.pageFiveNaked.y = 510;
            this.question2.addChild(this.pageFiveNaked);

            this.question2.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                // 点击 问题2 一毛不拔 按钮，回答错误
                if(e.target == this.pageFiveMean) {
                    var self: PageFive = this;
                    this.removeChild(this.question2);
                    this.removeChild(this.pageMask);
                    this.showDialog2(function() {
                        self.removeChild(self.pageFiveDialogTwo);
                        self.removeChild(self.pageMask);
                        self.showQuestion2();
                    });
                } 
                
                // 点击 问题2 一丝不挂 按钮，回答正确
                if(e.target == this.pageFiveNaked){
                    var self: PageFive = this;
                    this.removeChild(this.question2);
                    this.removeChild(this.pageMask);
                    this.showDialog4(function() {
                        self.removeChild(self.pageFiveDialogFour);
                        self.removeChild(self.pageMask);
                        self.showPopup();
                    });
                    this.answerState = 'complete';
                }
            }, this);

            Util.showObject(this.question2, {
                width: 687,
                height: 755,
                duration: 400
            }, cb);
        }

        // 显示成功获取弹窗
        private showPopup(cb: Function = function() {}): void {
            this.createMask();
            this.winPopup = new eui.Group();
            this.addChild(this.winPopup);
            this.winPopup.width = 704;
            this.winPopup.height = 774;
            this.winPopup.x = 16;
            this.winPopup.y = 203;
            this.pageFiveWinPopup = new eui.Image();
            this.pageFiveWinPopup.source = 'page5-winPopup_png';
            this.winPopup.addChild(this.pageFiveWinPopup);
            this.pageFiveWinBtn = new eui.Image();
            this.pageFiveWinBtn.source = 'page5-winBtn_png';
            this.pageFiveWinBtn.width = 263;
            this.pageFiveWinBtn.height = 101;
            this.pageFiveWinBtn.x = 240;
            this.pageFiveWinBtn.y = 580;
            this.winPopup.addChild(this.pageFiveWinBtn);

            // 监听获取按钮的事件
            this.pageFiveWinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.Event) => {
                this.onNextPage();
            }, this);

            Util.showObject(this.winPopup, {
                width: 704,
                height: 774,
                duration: 300
            }, cb);
        }

        // 移动背景
        private beginMove(): void {
            this.startWalk();
            this.addEventListener(egret.Event.ENTER_FRAME, this.onMove, this);
        }

        // 背景停止移动
        private stopMove(): void {
            this.stopWalk();
            this.removeEventListener(egret.Event.ENTER_FRAME,  this.onMove, this);
        }

        private onMove(): void {
            if(this.direction == 'left') {
                this.walkingBear.skewY = 180;
                this.walkingCEO.skewY = 180;
                
                if(this.pageFiveBg.right - this.speed > this.minRight) {
                    this.moveWithBg(-this.speed);
                    // this.pageFiveBg.right -= this.speed;
                    // this.talkingOxContainer.right -= this.speed;
                    // this.pageFiveArrow.right -= this.speed;
                }
            }

            if(this.direction == 'right') {
                this.walkingBear.skewY = 0;
                this.walkingCEO.skewY = 0;
                
                if(this.pageFiveBg.right + this.speed < this.maxRight) {
                    this.moveWithBg(this.speed);
                    // this.pageFiveBg.right += this.speed;
                    // this.talkingOxContainer.right += this.speed;
                    // this.pageFiveArrow.right += this.speed;
                }

                // 快到的时候，把向右走的提示箭头去掉
                if(this.pageFiveBg.right + this.speed > this.maxRight - 500 && !this.isRightArrowHintRemoved) {
                    this.isRightArrowHintRemoved = true;
                }
            }
        }

        // tap 点击之后的响应事件
        private onTap(): void {
            this.startWalk();

            if(this.direction == 'left') {
                this.walkingBear.skewY = 180;
                this.walkingCEO.skewY = 180;
            }

            if(this.direction == 'right') {
                this.walkingBear.skewY = 0;
                this.walkingCEO.skewY = 0;
            }

            this.startTime = egret.getTimer();

            this.move();
        }

        // tap 点击，移动一小段后停止
        private move(): void {
            var timeoutId: number = setTimeout(() => {
                if(egret.getTimer() - this.startTime > 600) {
                    clearTimeout(timeoutId);
                    this.stopMove();
                    
                    this.direction = 'stand';
                    this.stopWalk();
                } else {
                    this.move();
                }
            }, 100);

            if(this.direction == 'left') {
                this.resetBtn(this.pageFiveLeftBtn);
            }

            if(this.direction == 'right') {
                this.resetBtn(this.pageFiveRightBtn);
            }

            if(this.direction == 'left' && this.pageFiveBg.right - this.speed > this.minRight) {
                this.moveWithBg(-this.speed);
                // this.pageFiveBg.right -= this.speed;
                // this.talkingOxContainer.right -= this.speed;
                // this.pageFiveArrow.right -= this.speed;
            }

            if(this.direction == 'right') {
                if(this.pageFiveBg.right + this.speed < this.maxRight) {
                    this.moveWithBg(this.speed);
                    // this.pageFiveBg.right += this.speed;
                    // this.talkingOxContainer.right += this.speed;
                    // this.pageFiveArrow.right += this.speed;
                } 

                // 快到的时候，把向右走的提示箭头去掉
                if(this.pageFiveBg.right + this.speed > this.maxRight - 500 && !this.isRightArrowHintRemoved) {
                    this.isRightArrowHintRemoved = true;
                }
            }
        }

        // 添加 gif 图
        private createGifContainer(name: string, originRight: number, originTop: number = 680, scaleX: number = .6, scaleY: number = .6): eui.Group {
            var gifContainer: eui.Group = new eui.Group();
            // this.addChild(gifContainer);
            gifContainer.top = originTop;
            gifContainer.right = originRight;
            
            var gif = MovieClipManager.getInstance().getMC(name);
            gifContainer.addChild(gif);
            gif.scaleX = scaleX;
            gif.scaleY = scaleY;
            return gifContainer;
        }

        // 将所有的 gif 图添加到场景中
        private addAllGifToContainer(): void {
            this.talkingOxContainer = this.createGifContainer('talkingOx', this.pageFiveBg.right - 200);
            this.momAndKidContainer = this.createGifContainer('momAndKid', this.pageFiveBg.right + 400, 746, .8, .8);
            this.friedChickenContainer = this.createGifContainer('friedChicken', this.pageFiveBg.right + 1100, 566, 1, 1);            
            this.kidContainer =  this.createGifContainer('kid', this.pageFiveBg.right + 1800, 820, .8, .8);
            this.balloonContainer = this.createGifContainer('balloon', this.pageFiveBg.right + 4700, 644, 1, 1);
            this.programmerContainer = this.createGifContainer('programmer', this.pageFiveBg.right + 3000, 580, .7, .7);
            this.addChild(this.talkingOxContainer);
            this.addChild(this.momAndKidContainer);
            this.addChild(this.kidContainer);
            this.addChild(this.friedChickenContainer);
            this.addChild(this.balloonContainer);
            this.addChild(this.programmerContainer);

            // to do : 加一张告示图片
            this.announcement = new eui.Image();
            this.announcement.source = 'page5-annoucement_png';
            this.announcement.top = 700;
            this.announcement.scaleX = .8;
            this.announcement.scaleY = .8;
            this.announcement.right = 3500 + this.pageFiveBg.right;
            this.addChild(this.announcement);
        }

        // 让 gif 动起来
        private makeGifMove(): void {
            var momAndKid: egret.MovieClip = <egret.MovieClip>this.momAndKidContainer.getChildAt(0);
            var kid: egret.MovieClip = <egret.MovieClip>this.kidContainer.getChildAt(0);
            var friedChicken: egret.MovieClip = <egret.MovieClip>this.friedChickenContainer.getChildAt(0);
            var balloon: egret.MovieClip = <egret.MovieClip>this.balloonContainer.getChildAt(0);
            var programmer: egret.MovieClip = <egret.MovieClip>this.programmerContainer.getChildAt(0);
            momAndKid.gotoAndPlay(0, -1);
            kid.gotoAndPlay(0, -1);
            friedChicken.gotoAndPlay(0, -1);
            balloon.gotoAndPlay(0, -1);
            programmer.gotoAndPlay(0, -1);
        }

        // 跟背景一起移动
        private moveWithBg(speed: number): void {
            this.pageFiveBg.right += speed;
            this.talkingOxContainer.right += speed;
            this.momAndKidContainer.right += speed;
            this.kidContainer.right += speed;
            this.friedChickenContainer.right += speed;
            this.balloonContainer.right += speed;
            this.programmerContainer.right += speed;
            this.announcement.right += speed;
            this.pageFiveArrow.right += speed;
        }

        // 黄牛
        // private oxTalking(): void {
        //     this.talkingOxContainer = new eui.Group();
        //     this.addChild(this.talkingOxContainer);
        //     this.talkingOxContainer.top = 780;
        //     this.talkingOxContainer.right = this.pageFiveBg.right - 200;
            
        //     this.talkingOx = MovieClipManager.getInstance().getMC('talkingOx');
        //     this.talkingOxContainer.addChild(this.talkingOx);
        //     this.talkingOx.scaleX = .6;
        //     this.talkingOx.scaleY = .6;
        // }

        // 箭头提示
        private arrowHint(): void {
            egret.Tween.get(this.pageFiveArrow, {loop: true}).to({
                top: 630
            }, 500)
            .to({
                top: 570
            }, 500);
        }

        // 走动的贝贝熊
        private bearWalking(): void {
            var walkingBear = MovieClipManager.getInstance().getMC('walkingBear');

            this.walkingBear = walkingBear;
            this.addChild(this.walkingBear); 
            this.walkingBear.x = 220;
            this.walkingBear.y = 880;
            this.walkingBear.scaleX = .9;
            this.walkingBear.scaleY = .9;
            this.walkingBear.anchorOffsetX = this.walkingBear.width / 2;
            this.walkingBear.anchorOffsetY = this.walkingBear.height / 2;
            this.walkingBear.x += this.walkingBear.anchorOffsetX;
            this.walkingBear.y += this.walkingBear.anchorOffsetY;
        }

        // 走动的 CEO
        private ceoWalking(): void {
            var walkingCEO = MovieClipManager.getInstance().getMC('walkingCEO');
            this.walkingCEO = walkingCEO;
            this.addChild(this.walkingCEO);
            this.walkingCEO.x = 80;
            this.walkingCEO.y = 880;
            this.walkingCEO.scaleX = .9;
            this.walkingCEO.scaleY = .9;
            this.walkingCEO.anchorOffsetX = this.walkingCEO.width / 2;
            this.walkingCEO.anchorOffsetY = this.walkingCEO.height / 2;
            this.walkingCEO.x += this.walkingCEO.anchorOffsetX;
            this.walkingCEO.y += this.walkingCEO.anchorOffsetY;
        }

        // 贝贝熊开始走动，CEO 开始走动
        private startWalk(): void {
            if(!this.walkingBear.isPlaying) {
                this.walkingBear.play(-1);
            }
            if(!this.walkingCEO.isPlaying) {
                this.walkingCEO.play(-1);
            }
        }

        // 贝贝熊停止走动, CEO 停止走动
        private stopWalk(): void {
            if(this.walkingBear.isPlaying) {
                this.walkingBear.stop();
            }
            if(this.walkingCEO.isPlaying) {
                this.walkingCEO.stop();
            }
        }

        //添加显示列表
        private onAdded(e: egret.Event) {
            this.sceneEvent.eventType = SceneEvent.GAME_PAGE6;
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