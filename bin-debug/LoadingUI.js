//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.startX = 25;
        this.startY = 520;
        this.addBg();
        this.createWalkingBear();
        this.createView();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createView = function () {
        this.bubbleText = new eui.Group();
        this.addChild(this.bubbleText);
        this.bubbleText.width = 150;
        this.bubbleText.height = 90;
        this.bubbleText.x = this.startX - 75;
        this.bubbleText.y = this.startY - 80;
        // 添加起泡的背景
        var bubble = new eui.Image();
        this.bubbleText.addChild(bubble);
        bubble.source = 'loading-bubble_png';
        bubble.width = 150;
        bubble.height = 90;
        // 添加加载百分比的文字
        this.textField = new egret.TextField();
        this.bubbleText.addChild(this.textField);
        this.textField.width = 150;
        this.textField.y = 20;
        this.textField.textAlign = 'center';
    };
    // 添加背景
    p.addBg = function () {
        var bg = new eui.Image();
        this.addChild(bg);
        bg.source = 'loading-bg_jpg';
        bg.top = 0;
        bg.left = 0;
        bg.right = 0;
        bg.bottom = 0;
    };
    // 添加行走的贝贝熊
    p.createWalkingBear = function () {
        this.walkingBear = game.MovieClipManager.getInstance().getMC('walkingBear');
        this.addChild(this.walkingBear);
        this.walkingBear.gotoAndPlay(0, -1);
        this.walkingBear.scaleX = .5;
        this.walkingBear.scaleY = .5;
        this.walkingBear.x = this.startX;
        this.walkingBear.y = this.startY;
    };
    p.setProgress = function (current, total) {
        var percent = Math.floor(current / total * 100);
        var currX = 600 * current / total;
        this.textField.text = percent + "%";
        this.walkingBear.x = currX;
        this.bubbleText.x = currX;
    };
    return LoadingUI;
}(egret.Sprite));
egret.registerClass(LoadingUI,'LoadingUI');
//# sourceMappingURL=LoadingUI.js.map