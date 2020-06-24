/**
 * 虽然以前在学习webgl过程中了解过 glMartix 等等相关的这种库
 * 但是学习还是得连根拔起，魔法可不是过家家哦。
 * 
 * 代码实现和思路，有参考和借鉴：
 * gl-Matrix (https://github.com/toji/gl-matrix)
 */
namespace Magic {
    export class Vector2 {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x || 0;
            this.y = y || 0
        }

        static Zero(): Vector2 {
            return new Vector2(0, 0)
        }
    }
}