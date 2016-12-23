var game;
(function (game) {
    /**
     *
     * @author xsstomy
     *
     */
    var SceneEvent = (function (_super) {
        __extends(SceneEvent, _super);
        function SceneEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=SceneEvent,p=c.prototype;
        SceneEvent.ChangeScene = "changeScene";
        SceneEvent.GAME_PAGE1 = "page1";
        SceneEvent.GAME_PAGE2 = "page2";
        SceneEvent.GAME_PAGE3 = "page3";
        SceneEvent.GAME_PAGE4 = "page4";
        SceneEvent.GAME_PAGE5 = "page5";
        SceneEvent.GAME_PAGE6 = "page6";
        SceneEvent.GAME_PAGE7 = "page7";
        return SceneEvent;
    }(egret.Event));
    game.SceneEvent = SceneEvent;
    egret.registerClass(SceneEvent,'game.SceneEvent');
})(game || (game = {}));
//# sourceMappingURL=SceneEvents.js.map