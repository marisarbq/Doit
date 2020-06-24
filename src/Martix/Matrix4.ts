/**
 * 虽然以前在学习webgl过程中了解过 glMartix 等等相关的这种库
 * 但是学习还是得连根拔起，魔法可不是过家家哦。
 * 
 * 代码实现和思路，有参考和借鉴：
 * gl-Matrix (https://github.com/toji/gl-matrix)
 */
namespace Magic {

    export const ARRAY = (typeof Float32Array).length < 9 ? Float32Array : Array;

    // 4x4矩阵
    export class Matrix4 {
        node: number[] | Float32Array;

        constructor(x: number, y: number, z: number) {
            let out = this.node = new ARRAY();
            if (Magic.ARRAY !== Float32Array) {
                out[1] = 0;
                out[2] = 0;
                out[3] = 0;
                out[4] = 0;
                out[6] = 0;
                out[7] = 0;
                out[8] = 0;
                out[9] = 0;
                out[11] = 0;
                out[12] = 0;
                out[13] = 0;
                out[14] = 0;
            }
            out[0] = x;
            out[5] = y;
            out[10] = z;
            out[15] = 1;
        }


        static fill(arr: any, fill: number, start: number, end: number) {
            fill = fill || 0;
            while (start <= end) {
                arr[start] = fill;
                start++;
            }
        }

        static fillMat(arr: any, mat4: Matrix4, start: number, end: number) {
            const fill = mat4.node || Matrix4.default().node;
            while (start <= end) {
                arr[start] = fill[start];
                start++;
            }
        }

        static default(): Matrix4 {
            return new Matrix4(1, 1, 1);
        }

        copy(mat4: Matrix4) {
            Matrix4.fillMat(this.node, mat4, 0, 15);
        }

        static fromString(str: string) {
            let arr = str.split(',');
            let mat4 = Matrix4.default();
            let n = mat4.node;
            let start = 0, len = 16
            while (start < len) {
                n[start] = parseFloat(arr[start]);
                start++;
            }
        }
    }
}