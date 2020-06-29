export default class KeyBoard {

    static keyDownFn: { [key: string]: Function } = {}
    static keyUpFn: { [key: string]: Function } = {}
    static bindStatus: IWASDStatus = null;
    static init() {
        document.body.addEventListener('keydown', (e) => {
            if (this.keyDownFn[e.key]) this.keyDownFn[e.key]();
        });

        document.body.addEventListener('keyup', (e) => {
            if (this.keyUpFn[e.key]) this.keyUpFn[e.key]();
        });

        ["w", "a", "s", "d"].map(key => {
            this.keyDown(key, () => this.bindStatus ? this.bindStatus[key] = true : void 0);
            this.keyUp(key, () => this.bindStatus ? this.bindStatus[key] = false : void 0);
        })
    }

    static keyDown(key: string, fn: Function) {
        this.keyDownFn[key] = fn;
    }

    static keyUp(key: string, fn: Function) {
        this.keyUpFn[key] = fn;
    }

    static wasd(status: IWASDStatus) {
        this.bindStatus = status;
    }

    static clearWASD() {
        this.bindStatus = null;
    }


}

