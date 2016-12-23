module game {
	/**
	 *
	 * @author xsstomy
	 *
	 */
	export class SceneEvent extends egret.Event{
        public static ChangeScene: string = "changeScene";
        public eventType: string;//事件类型
        public eventObj: any;//对象
        
        
        public static GAME_PAGE1: string = "page1";
        public static GAME_PAGE2: string = "page2";
        public static GAME_PAGE3: string = "page3";
        public static GAME_PAGE4: string = "page4";
        public static GAME_PAGE5: string = "page5";
        public static GAME_PAGE6: string = "page6";
        public static GAME_PAGE7: string = "page7";
        public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
            super(type,bubbles,cancelable);
		}
	}
}
