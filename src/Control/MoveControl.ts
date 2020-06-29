import { Control } from "./Control";

export class MoveControl extends Control{

    constructor() {
        super();
    }

    public onUpdate() {
        let vec3 = glMatrix.vec3;
        
        if (this.keyStatus.w) {
            this.cameraPos[0] += this.cameraFront[0] * this.cameraSpeed;
            this.cameraPos[1] += this.cameraFront[1] * this.cameraSpeed;
            this.cameraPos[2] += this.cameraFront[2] * this.cameraSpeed;
        }

        if (this.keyStatus.s) {
            this.cameraPos[0] -= this.cameraFront[0] * this.cameraSpeed;
            this.cameraPos[1] -= this.cameraFront[1] * this.cameraSpeed;
            this.cameraPos[2] -= this.cameraFront[2] * this.cameraSpeed;
        }
        if (this.keyStatus.a) {
            let v = vec3.create();
            vec3.cross(v, this.cameraFront, this.cameraUp);
            this.cameraPos[0] -= v[0] * this.cameraSpeed;
            this.cameraPos[1] -= v[1] * this.cameraSpeed;
            this.cameraPos[2] -= v[2] * this.cameraSpeed;
        }
        if (this.keyStatus.d) {
            let v = vec3.create();
            vec3.cross(v, this.cameraFront, this.cameraUp);
            this.cameraPos[0] += v[0] * this.cameraSpeed;
            this.cameraPos[1] += v[1] * this.cameraSpeed;
            this.cameraPos[2] += v[2] * this.cameraSpeed;
        }
    }
}