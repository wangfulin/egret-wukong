// TypeScript file
var game;
(function (game) {
    var MovieClipManager = (function () {
        function MovieClipManager() {
            this.init('sprites_json', 'sprites_png');
        }
        var d = __define,c=MovieClipManager,p=c.prototype;
        p.init = function (jsonFile, pngFile) {
            var data = RES.getRes(jsonFile);
            var png = RES.getRes(pngFile);
            this.mcFactory = new egret.MovieClipDataFactory(data, png);
        };
        p.getMC = function (name) {
            var mc = new egret.MovieClip(this.mcFactory.generateMovieClipData(name));
            return mc;
        };
        MovieClipManager.getInstance = function () {
            if (MovieClipManager.instance == null) {
                MovieClipManager.instance = new MovieClipManager();
            }
            return MovieClipManager.instance;
        };
        return MovieClipManager;
    }());
    game.MovieClipManager = MovieClipManager;
    egret.registerClass(MovieClipManager,'game.MovieClipManager');
})(game || (game = {}));
//# sourceMappingURL=MovieClipManager.js.map