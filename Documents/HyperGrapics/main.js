/**
 * 
 * 尽量会参考web技术，而不是游戏行业的技术名字，思路更偏向于传统web前端的布局
 * 
 */

var main_env = {
    "title": "空间名字",
    "meta": {
        "renderer": "指定渲染器，未来的标准渲染器可能有很多实现",
        "web": "是否兼容传统web技术"
    },
    "common": {
        "js": [
            "引入脚本，凡是能用js写的，最终都会用js("
        ]
    },
    "body": "此处应该只是一个静态EnvObject的tree，可以是由其他语言的组件编译而来，可能分得需要比传统js-html-css更细一些，因为涉及内容较多，我更希望不同领域之间应当用不同的语言来描述。",
    "ex_body": {
        "scene": {
            "type": "cube",
            /**
             * space 属性为 空间属性，
             *  1. [default]static 静态欧氏几何空间，物体不会碰撞，没有力
             *  2. gravity 重力空间，有一个重力方向，物体会受到重力但是不会碰撞
             *  3. force 碰撞空间，也可以有重力
             *  4. strange 奇异空间，实验性空间
             *  5. extend 继承空间，他会继承父类的空间属性
             */
            "space": "static",
            /**
             * 坐标系类型，这里暂时用大佬笛卡尔的名字当做属性名
             * 1. left
             * 2. right
             */
            "descartes": "left",
            /**
             * 类似dom的style
             */
            "style": {
                /**
                * 坐标信息，一般是继承最近的一个world父类，当自身的position 属性是 world自己会成为子类的继承对象。
                * 注意这里和游戏行业的tree结构不同，游戏行业的object大对数都会无条件继承上一个父类的transform，这里更像dom结构必须找到world父类，默认整个空间的最上层以太空间就是world
                * 
                * 
                */
                position: "local",
                /**
                 * 坐标是一种虚拟尺度，这个不是 `px` 而是一个 `虚拟的尺寸 Virtual Scale`。
                 * 这个虚拟尺寸和设备和相机最终的输出有关，但是应该是个标准，
                 * 假设相机输出 固定的 AxB,那么根据相机属性会反算出一个 1vs是多少
                 * 默认 vs 单位不写
                 */
                x: 100,
                y: 100,
                z: 100
            },
            "box": {
                "type": "cube"
            }
        }
    }
}