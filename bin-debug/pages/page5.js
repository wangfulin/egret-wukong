// TypeScript file
var game;
(function (game) {
    var PageFive = (function (_super) {
        __extends(PageFive, _super);
        function PageFive() {
            _super.call(this);
            // 答题状态: notStart, success, fail, complete
            this.answerState = 'notStart';
            this.isOxClicked = false;
            this.isRightArrowHintRemoved = false;
            this.questionNum = 0;
            this.minRight = -4700;
            this.maxRight = 600;
            this.isCEODialogShowed = false;
            this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            // 默认是静止状态
            this.direction = 'stand';
            // 行走速度
            this.speed = 16;
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
        var d = __define,c=PageFive,p=c.prototype;
        // 增加蒙层
        p.createMask = function () {
            this.pageMask = new egret.Shape();
            this.pageMask.graphics.beginFill(0x000000);
            this.pageMask.graphics.drawRect(0, 0, 750, 1334);
            this.pageMask.graphics.endFill();
            this.pageMask.alpha = .6;
            this.addChild(this.pageMask);
        };
        p.magnifyBtn = function (btn) {
            btn.scaleX = 1.1;
            btn.scaleY = 1.1;
        };
        p.resetBtn = function (btn) {
            btn.scaleX = 1;
            btn.scaleY = 1;
        };
        // 绑定左右箭头的事件
        p.addListener = function () {
            // this.pageFiveLeftBtn.addEventListener(egret.TouchEvent.FOCUS_OUT, (e: egret.Event) => {
            //     this.direction = 'left';
            //     this.resetBtn(this.pageFiveLeftBtn);
            //     this.stopMove();
            // }, this);
            var _this = this;
            // this.pageFiveLeftBtn.addEventListener(egret.TouchEvent.FOCUS_IN, (e: egret.Event) => {
            //     this.direction = 'left';
            //     this.magnifyBtn(this.pageFiveLeftBtn);
            //     this.beginMove();
            // }, this);
            this.pageFiveLeftBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                // 往左走
                _this.direction = 'left';
                _this.magnifyBtn(_this.pageFiveLeftBtn);
                _this.beginMove();
            }, this);
            this.pageFiveLeftBtn.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
                // 停止
                _this.direction = 'stand';
                _this.resetBtn(_this.pageFiveLeftBtn);
                _this.stopMove();
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
            this.pageFiveRightBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                // 往右走
                _this.direction = 'right';
                _this.magnifyBtn(_this.pageFiveRightBtn);
                _this.beginMove();
            }, this);
            this.pageFiveRightBtn.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
                // 停止
                _this.direction = 'stand';
                _this.resetBtn(_this.pageFiveRightBtn);
                _this.stopMove();
            }, this);
            // 监听 左边按钮 tap 事件
            this.pageFiveLeftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                // 往左走
                if (!_this.walkingBear.isPlaying && !_this.walkingCEO.isPlaying) {
                    _this.direction = 'left';
                    _this.magnifyBtn(_this.pageFiveLeftBtn);
                    _this.onTap();
                }
            }, this);
            // 监听 右边按钮 tap 事件
            this.pageFiveRightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                // 往右走
                if (!_this.walkingBear.isPlaying && !_this.walkingCEO.isPlaying) {
                    _this.direction = 'right';
                    _this.magnifyBtn(_this.pageFiveRightBtn);
                    _this.onTap();
                }
            }, this);
            // 点击黄牛，黄牛说话
            this.talkingOxContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                var talkingOx = _this.talkingOxContainer.getChildAt(0);
                if (!talkingOx.isPlaying && !_this.isOxClicked) {
                    _this.isOxClicked = true;
                    _this.removeChild(_this.pageFiveArrow);
                    var self = _this;
                    _this.showCEODialog(function () {
                        self.removeChild(self.pageMask);
                        self.removeChild(self.pageFiveDialogCEO);
                        talkingOx.gotoAndPlay(1, 10);
                        self.showDialog1(function () {
                            self.removeChild(self.pageFiveDialogOne);
                            self.removeChild(self.pageMask);
                            self.showQuestion1();
                        });
                    });
                }
            }, this);
        };
        // 显示对话1
        p.showDialog1 = function (cb) {
            this.createMask();
            this.pageFiveDialogOne = new eui.Image();
            this.pageFiveDialogOne.source = 'page5-dialog1_png';
            this.addChild(this.pageFiveDialogOne);
            this.pageFiveDialogOne.alpha = 0;
            this.pageFiveDialogOne.width = 0;
            this.pageFiveDialogOne.height = 0;
            this.pageFiveDialogOne.x = 366;
            this.pageFiveDialogOne.y = 560;
            game.Util.showDialog(this.pageFiveDialogOne, {
                width: 662,
                height: 312,
                delay: 2400,
                duration: 300
            }, cb);
        };
        // 显示对话2
        p.showDialog2 = function (cb) {
            this.createMask();
            this.pageFiveDialogTwo = new eui.Image();
            this.pageFiveDialogTwo.source = 'page5-dialog2_png';
            this.addChild(this.pageFiveDialogTwo);
            this.pageFiveDialogTwo.alpha = 0;
            this.pageFiveDialogTwo.width = 0;
            this.pageFiveDialogTwo.height = 0;
            this.pageFiveDialogTwo.x = 366;
            this.pageFiveDialogTwo.y = 560;
            game.Util.showDialog(this.pageFiveDialogTwo, {
                width: 662,
                height: 312,
                delay: 2400,
                duration: 300
            }, cb);
        };
        // 显示对话3
        p.showDialog3 = function (cb) {
            this.createMask();
            this.pageFiveDialogThree = new eui.Image();
            this.pageFiveDialogThree.source = 'page5-dialog3_png';
            this.addChild(this.pageFiveDialogThree);
            this.pageFiveDialogThree.alpha = 0;
            this.pageFiveDialogThree.width = 0;
            this.pageFiveDialogThree.height = 0;
            this.pageFiveDialogThree.x = 366;
            this.pageFiveDialogThree.y = 560;
            game.Util.showDialog(this.pageFiveDialogThree, {
                width: 662,
                height: 312,
                delay: 2400,
                duration: 300
            }, cb);
        };
        // 显示对话4
        p.showDialog4 = function (cb) {
            this.createMask();
            this.pageFiveDialogFour = new eui.Image();
            this.pageFiveDialogFour.source = 'page5-dialog4_png';
            this.addChild(this.pageFiveDialogFour);
            this.pageFiveDialogFour.alpha = 0;
            this.pageFiveDialogFour.width = 0;
            this.pageFiveDialogFour.height = 0;
            this.pageFiveDialogFour.x = 366;
            this.pageFiveDialogFour.y = 560;
            game.Util.showDialog(this.pageFiveDialogFour, {
                width: 662,
                height: 312,
                delay: 2400,
                duration: 300
            }, cb);
        };
        // 显示 ceo 对话
        p.showCEODialog = function (cb) {
            if (cb === void 0) { cb = function () { }; }
            this.createMask();
            this.pageFiveDialogCEO = new eui.Image();
            this.pageFiveDialogCEO.source = 'page5-dialogCEO_png';
            this.addChild(this.pageFiveDialogCEO);
            this.pageFiveDialogCEO.alpha = 0;
            this.pageFiveDialogCEO.width = 0;
            this.pageFiveDialogCEO.height = 0;
            this.pageFiveDialogCEO.x = 300;
            this.pageFiveDialogCEO.y = 760;
            game.Util.showDialog(this.pageFiveDialogCEO, {
                width: 587,
                height: 342,
                delay: 2400,
                duration: 300
            }, cb);
        };
        // 显示问题1
        p.showQuestion1 = function (cb) {
            var _this = this;
            if (cb === void 0) { cb = function () { }; }
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
            this.question1.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                // 点击 问题1 php 按钮，回答正确
                if (e.target == _this.pageFivePhp) {
                    var self = _this;
                    _this.removeChild(_this.question1);
                    _this.removeChild(_this.pageMask);
                    _this.answerState = 'success';
                    _this.showDialog3(function () {
                        self.removeChild(self.pageFiveDialogThree);
                        self.removeChild(self.pageMask);
                        self.showQuestion2();
                    });
                }
                // 点击 问题1 火星语 按钮， 回答错误
                if (e.target == _this.pageFiveMarsLanguage) {
                    _this.removeChild(_this.question1);
                    _this.removeChild(_this.pageMask);
                    var self = _this;
                    // this.question1.alpha = 0;
                    _this.showDialog2(function () {
                        self.removeChild(self.pageFiveDialogTwo);
                        self.removeChild(self.pageMask);
                        self.showQuestion1();
                    });
                    _this.answerState = 'fail';
                }
            }, this);
            game.Util.showObject(this.question1, {
                width: 687,
                height: 755,
                duration: 400
            }, cb);
        };
        // 显示问题2
        p.showQuestion2 = function (cb) {
            var _this = this;
            if (cb === void 0) { cb = function () { }; }
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
            this.question2.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                // 点击 问题2 一毛不拔 按钮，回答错误
                if (e.target == _this.pageFiveMean) {
                    var self = _this;
                    _this.removeChild(_this.question2);
                    _this.removeChild(_this.pageMask);
                    _this.showDialog2(function () {
                        self.removeChild(self.pageFiveDialogTwo);
                        self.removeChild(self.pageMask);
                        self.showQuestion2();
                    });
                }
                // 点击 问题2 一丝不挂 按钮，回答正确
                if (e.target == _this.pageFiveNaked) {
                    var self = _this;
                    _this.removeChild(_this.question2);
                    _this.removeChild(_this.pageMask);
                    _this.showDialog4(function () {
                        self.removeChild(self.pageFiveDialogFour);
                        self.removeChild(self.pageMask);
                        self.showPopup();
                    });
                    _this.answerState = 'complete';
                }
            }, this);
            game.Util.showObject(this.question2, {
                width: 687,
                height: 755,
                duration: 400
            }, cb);
        };
        // 显示成功获取弹窗
        p.showPopup = function (cb) {
            var _this = this;
            if (cb === void 0) { cb = function () { }; }
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
            this.pageFiveWinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                _this.onNextPage();
            }, this);
            game.Util.showObject(this.winPopup, {
                width: 704,
                height: 774,
                duration: 300
            }, cb);
        };
        // 移动背景
        p.beginMove = function () {
            this.startWalk();
            this.addEventListener(egret.Event.ENTER_FRAME, this.onMove, this);
        };
        // 背景停止移动
        p.stopMove = function () {
            this.stopWalk();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onMove, this);
        };
        p.onMove = function () {
            if (this.direction == 'left') {
                this.walkingBear.skewY = 180;
                this.walkingCEO.skewY = 180;
                if (this.pageFiveBg.right - this.speed > this.minRight) {
                    this.moveWithBg(-this.speed);
                }
            }
            if (this.direction == 'right') {
                this.walkingBear.skewY = 0;
                this.walkingCEO.skewY = 0;
                if (this.pageFiveBg.right + this.speed < this.maxRight) {
                    this.moveWithBg(this.speed);
                }
                // 快到的时候，把向右走的提示箭头去掉
                if (this.pageFiveBg.right + this.speed > this.maxRight - 500 && !this.isRightArrowHintRemoved) {
                    this.isRightArrowHintRemoved = true;
                }
            }
        };
        // tap 点击之后的响应事件
        p.onTap = function () {
            this.startWalk();
            if (this.direction == 'left') {
                this.walkingBear.skewY = 180;
                this.walkingCEO.skewY = 180;
            }
            if (this.direction == 'right') {
                this.walkingBear.skewY = 0;
                this.walkingCEO.skewY = 0;
            }
            this.startTime = egret.getTimer();
            this.move();
        };
        // tap 点击，移动一小段后停止
        p.move = function () {
            var _this = this;
            var timeoutId = setTimeout(function () {
                if (egret.getTimer() - _this.startTime > 600) {
                    clearTimeout(timeoutId);
                    _this.stopMove();
                    _this.direction = 'stand';
                    _this.stopWalk();
                }
                else {
                    _this.move();
                }
            }, 100);
            if (this.direction == 'left') {
                this.resetBtn(this.pageFiveLeftBtn);
            }
            if (this.direction == 'right') {
                this.resetBtn(this.pageFiveRightBtn);
            }
            if (this.direction == 'left' && this.pageFiveBg.right - this.speed > this.minRight) {
                this.moveWithBg(-this.speed);
            }
            if (this.direction == 'right') {
                if (this.pageFiveBg.right + this.speed < this.maxRight) {
                    this.moveWithBg(this.speed);
                }
                // 快到的时候，把向右走的提示箭头去掉
                if (this.pageFiveBg.right + this.speed > this.maxRight - 500 && !this.isRightArrowHintRemoved) {
                    this.isRightArrowHintRemoved = true;
                }
            }
        };
        // 添加 gif 图
        p.createGifContainer = function (name, originRight, originTop, scaleX, scaleY) {
            if (originTop === void 0) { originTop = 680; }
            if (scaleX === void 0) { scaleX = .6; }
            if (scaleY === void 0) { scaleY = .6; }
            var gifContainer = new eui.Group();
            // this.addChild(gifContainer);
            gifContainer.top = originTop;
            gifContainer.right = originRight;
            var gif = game.MovieClipManager.getInstance().getMC(name);
            gifContainer.addChild(gif);
            gif.scaleX = scaleX;
            gif.scaleY = scaleY;
            return gifContainer;
        };
        // 将所有的 gif 图添加到场景中
        p.addAllGifToContainer = function () {
            this.talkingOxContainer = this.createGifContainer('talkingOx', this.pageFiveBg.right - 200);
            this.momAndKidContainer = this.createGifContainer('momAndKid', this.pageFiveBg.right + 400, 746, .8, .8);
            this.friedChickenContainer = this.createGifContainer('friedChicken', this.pageFiveBg.right + 1100, 566, 1, 1);
            this.kidContainer = this.createGifContainer('kid', this.pageFiveBg.right + 1800, 820, .8, .8);
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
        };
        // 让 gif 动起来
        p.makeGifMove = function () {
            var momAndKid = this.momAndKidContainer.getChildAt(0);
            var kid = this.kidContainer.getChildAt(0);
            var friedChicken = this.friedChickenContainer.getChildAt(0);
            var balloon = this.balloonContainer.getChildAt(0);
            var programmer = this.programmerContainer.getChildAt(0);
            momAndKid.gotoAndPlay(0, -1);
            kid.gotoAndPlay(0, -1);
            friedChicken.gotoAndPlay(0, -1);
            balloon.gotoAndPlay(0, -1);
            programmer.gotoAndPlay(0, -1);
        };
        // 跟背景一起移动
        p.moveWithBg = function (speed) {
            this.pageFiveBg.right += speed;
            this.talkingOxContainer.right += speed;
            this.momAndKidContainer.right += speed;
            this.kidContainer.right += speed;
            this.friedChickenContainer.right += speed;
            this.balloonContainer.right += speed;
            this.programmerContainer.right += speed;
            this.announcement.right += speed;
            this.pageFiveArrow.right += speed;
        };
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
        p.arrowHint = function () {
            egret.Tween.get(this.pageFiveArrow, { loop: true }).to({
                top: 630
            }, 500)
                .to({
                top: 570
            }, 500);
        };
        // 走动的贝贝熊
        p.bearWalking = function () {
            var walkingBear = game.MovieClipManager.getInstance().getMC('walkingBear');
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
        };
        // 走动的 CEO
        p.ceoWalking = function () {
            var walkingCEO = game.MovieClipManager.getInstance().getMC('walkingCEO');
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
        };
        // 贝贝熊开始走动，CEO 开始走动
        p.startWalk = function () {
            if (!this.walkingBear.isPlaying) {
                this.walkingBear.play(-1);
            }
            if (!this.walkingCEO.isPlaying) {
                this.walkingCEO.play(-1);
            }
        };
        // 贝贝熊停止走动, CEO 停止走动
        p.stopWalk = function () {
            if (this.walkingBear.isPlaying) {
                this.walkingBear.stop();
            }
            if (this.walkingCEO.isPlaying) {
                this.walkingCEO.stop();
            }
        };
        //添加显示列表
        p.onAdded = function (e) {
            this.sceneEvent.eventType = game.SceneEvent.GAME_PAGE6;
            this.sceneEvent.eventObj = this;
            // this.pageOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        //移除显示列表
        p.onRemoved = function (e) {
            // this.pageThreeCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        };
        // 跳转到下一个页面
        p.onNextPage = function () {
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return PageFive;
    }(eui.Component));
    game.PageFive = PageFive;
    egret.registerClass(PageFive,'game.PageFive');
})(game || (game = {}));
//# sourceMappingURL=page5.js.map