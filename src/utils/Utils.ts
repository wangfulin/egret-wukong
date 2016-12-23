// TypeScript file
module game {
    export class Util {
        public constructor() {

        }

        // 摇晃
        public static shake(displayObj: eui.Image): void {
            displayObj.anchorOffsetX = displayObj.width / 2;
            displayObj.anchorOffsetY = displayObj.height / 2;
            displayObj.x += displayObj.anchorOffsetX;
            displayObj.y += displayObj.anchorOffsetY;
            window.setTimeout(function() {
                egret.Tween.get(displayObj, {loop: true})
                    .to({rotation: 3}, 100, egret.Ease.circIn)
                    .to({rotation: 0}, 100, egret.Ease.circIn)
                    .to({rotation: -3}, 100, egret.Ease.circIn)
                    .to({rotation: 0, }, 100, egret.Ease.circIn);
            }, 1500);
        }

        // 弹出
        public static showObject(displayObj: any, opts: any, cb: Function = function() {}): void {
            opts.alpha = 1;
            egret.Tween.get(displayObj).to({alpha: 1}, 200).to(opts, opts.duration ? opts.duration : 400).wait(opts.delay ? opts.delay : 0).call(cb);
        }

        // 弹出对话框
        public static showDialog(displayObj: any, opts: any, cb: Function = function() {}): void {
            var width: number = opts.width;
            var height: number = opts.height;
            opts.x = displayObj.x - width / 2;
            opts.y = displayObj.y - height / 2;
            egret.Tween.get(displayObj).to({alpha: 1}, 200).to(opts, opts.duration ? opts.duration : 400).wait(opts.delay ? opts.delay : 0).call(cb);;
        }

        // 光束动画
        public static lightAnim(lightLeft: eui.Image, lightRight: eui.Image): void {
            lightLeft.anchorOffsetX = - lightLeft.width / 2;
            lightLeft.anchorOffsetY = - lightLeft.height / 2;
            // lightLeft.x += lightLeft.anchorOffsetX;
            // lightLeft.y += lightLeft.anchorOffsetY;
            egret.Tween.get(lightLeft)
                .to({alpha: 1}, 500)
                .to({skew: 30}, 5000);

            // 设置右边光束的旋转点
            egret.Tween.get(lightRight)
                .to({alpha: 1}, 500)
                .to({skewX: -30}, 5000);
        }
    }
}