import { Control } from "./Control";
import Pointer from "../Input/Pointer";

export class FPSControl extends Control {

    pointer: IPointer = {
        mx: 0,
        my: 0,
        update: false,
        enable: false,
        lock: false
    };


    public sensitivity = 0.005;
    public yaw = - Math.PI / 2;
    public pitch = 0;

    constructor() {
        super();
    }

    initControl() {
        Pointer.bindPointer(this.pointer);
        super.initControl();
    }

    closeControl() {
        Pointer.clearPointer();
        this.pointer.mx = 0;
        this.pointer.my = 0;
        this.pointer.update = false;
        this.pointer.lock = false;
        super.closeControl();
    }

    public onUpdate() {
        let vec3 = glMatrix.vec3;

        if (this.pointer.lock && this.pointer.update) {
            let front = vec3.fromValues(1.0, 1.0, 0.0);
            let x = this.pointer.mx * this.sensitivity;
            let y = this.pointer.my * this.sensitivity;
            let yaw = this.yaw += x;
            let pitch = this.pitch += -y;

            if (pitch > 1.55)
                pitch = this.pitch = 1.54;
            if (pitch < -1.55)
                pitch = this.pitch = -1.54;

            front[0] = Math.cos(yaw) * Math.cos(pitch);
            front[1] = Math.sin(pitch);
            front[2] = Math.sin(yaw) * Math.cos(pitch);

            vec3.normalize(this.cameraFront, front);
            this.pointer.update = false;
        }

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