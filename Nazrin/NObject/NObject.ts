import Transform from "../Space/Transfrom";

export default class NObject {
    public transform: Transform = Transform.zero;
    public _children: NObject[] = [];
    constructor() {

    }
}