
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/other/zepto.min.js",
	"libs/other/jweixin-1.0.0.js",
	"libs/other/share.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/component/SoundComponent.js",
	"bin-debug/component/shake.js",
	"bin-debug/controller/MovieClipManager.js",
	"bin-debug/controller/SoundManager.js",
	"bin-debug/controller/ViewManager.js",
	"bin-debug/event/SceneEvents.js",
	"bin-debug/pages/page1.js",
	"bin-debug/pages/page2.js",
	"bin-debug/pages/page3.js",
	"bin-debug/pages/page4.js",
	"bin-debug/pages/page5.js",
	"bin-debug/pages/page6.js",
	"bin-debug/pages/page7.js",
	"bin-debug/utils/Utils.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 12,
		scaleMode: "noBorder",
		contentWidth: 750,
		contentHeight: 1334,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};