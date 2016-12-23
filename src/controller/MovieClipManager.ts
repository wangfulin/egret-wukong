// TypeScript file
module game {
    export class MovieClipManager{
        public constructor() {
            this.init('sprites_json', 'sprites_png');
        }

        private mcFactory: egret.MovieClipDataFactory;
        private static instance: MovieClipManager;

        public init(jsonFile: string, pngFile: string) {
            var data: any = RES.getRes(jsonFile);
            var png: any = RES.getRes(pngFile);
            this.mcFactory = new egret.MovieClipDataFactory( data, png );
        }

        public getMC(name: string) {
            var mc:egret.MovieClip = new egret.MovieClip( this.mcFactory.generateMovieClipData(name) );
            return mc;
        }

        public static getInstance() {
            if(MovieClipManager.instance == null) {
                MovieClipManager.instance = new MovieClipManager();
            }
            return MovieClipManager.instance;
        }
    }
}