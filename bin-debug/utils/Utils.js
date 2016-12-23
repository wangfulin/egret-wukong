// TypeScript file
var game;
(function (game) {
    var Util = (function () {
        function Util() {
        }
        var d = __define,c=Util,p=c.prototype;
        // 摇晃
        Util.shake = function (displayObj) {
            displayObj.anchorOffsetX = displayObj.width / 2;
            displayObj.anchorOffsetY = displayObj.height / 2;
            displayObj.x += displayObj.anchorOffsetX;
            displayObj.y += displayObj.anchorOffsetY;
            window.setTimeout(function () {
                egret.Tween.get(displayObj, { loop: true })
                    .to({ rotation: 3 }, 100, egret.Ease.circIn)
                    .to({ rotation: 0 }, 100, egret.Ease.circIn)
                    .to({ rotation: -3 }, 100, egret.Ease.circIn)
                    .to({ rotation: 0, }, 100, egret.Ease.circIn);
            }, 1500);
        };
        // 弹出
        Util.showObject = function (displayObj, opts, cb) {
            if (cb === void 0) { cb = function () { }; }
            opts.alpha = 1;
            egret.Tween.get(displayObj).to({ alpha: 1 }, 200).to(opts, opts.duration ? opts.duration : 400).wait(opts.delay ? opts.delay : 0).call(cb);
        };
        // 弹出对话框
        Util.showDialog = function (displayObj, opts, cb) {
            if (cb === void 0) { cb = function () { }; }
            var width = opts.width;
            var height = opts.height;
            opts.x = displayObj.x - width / 2;
            opts.y = displayObj.y - height / 2;
            egret.Tween.get(displayObj).to({ alpha: 1 }, 200).to(opts, opts.duration ? opts.duration : 400).wait(opts.delay ? opts.delay : 0).call(cb);
            ;
        };
        // 光束动画
        Util.lightAnim = function (lightLeft, lightRight) {
            lightLeft.anchorOffsetX = -lightLeft.width / 2;
            lightLeft.anchorOffsetY = -lightLeft.height / 2;
            // lightLeft.x += lightLeft.anchorOffsetX;
            // lightLeft.y += lightLeft.anchorOffsetY;
            egret.Tween.get(lightLeft)
                .to({ alpha: 1 }, 500)
                .to({ skew: 30 }, 5000);
            // 设置右边光束的旋转点
            egret.Tween.get(lightRight)
                .to({ alpha: 1 }, 500)
                .to({ skewX: -30 }, 5000);
        };
        return Util;
    }());
    game.Util = Util;
    egret.registerClass(Util,'game.Util');
})(game || (game = {}));
//# sourceMappingURL=Utils.js.map