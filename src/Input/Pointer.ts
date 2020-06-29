export default class Pointer {
    static current: IPointer = null;

    static view: HTMLCanvasElement = null;

    static init(view: HTMLCanvasElement) {
        this.view = view;
        view.addEventListener('mousemove', this.onMousemove.bind(this));
        view.addEventListener('click', this.onClick.bind(this));
        document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
    }


    static onMousemove(e) {
        if (!this.current) return;
        this.current.mx = e.movementX;
        this.current.my = e.movementY;
        this.current.update = true;
    }

    static onClick(e) {
        console.log(this.current,this.view)

        if (!this.current) return;
        if (!this.view) return;
        this.current.lock = true;
        this.view.requestPointerLock();
    }

    static onPointerLockChange() {
        if (!this.current) return;
        if (document.pointerLockElement === this.view) {
            this.current.lock = true;
        } else {
            this.current.lock = false;
        }
    }

    static bindPointer(p: IPointer) {
        this.current = p
    }

    static clearPointer() {
        this.current = null;
    }
}