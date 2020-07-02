export default class Transform {
    x: number;
    y: number;
    constructor(pos: IVec2) {
        this.x = pos.x;
        this.y = pos.y;
    }

    static get zero(): Transform {
        return new Transform({
            x: 0,
            y: 0
        });
    }

    get pos() {
        return {
            x:this.x,
            y:this.y
        }
    }

    copy(t: Transform) {
        return new Transform(t.pos)
    }
}

interface IVec2 {
    x: number,
    y: number
}