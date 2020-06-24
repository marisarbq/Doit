'use strict';

function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var MagicString = _interopDefault(require('magic-string'));

function generateCode(textArr) {
    const br = `
    `
    let vs = textArr.vs ? textArr.vs.join(br) : void 0;
    let fs = textArr.fs ? textArr.fs.join(br) : void 0;
    let draw = textArr.draw ? textArr.draw.join(br) : void 0;
    let update = textArr.update ? textArr.update.join(br) : void 0;


    let imgstr = `[]`
    if (textArr.img) {
        let imgarr = textArr.img.map(url => {
            return `"${url}"`
        })
        imgstr = `[${imgarr.toString()}]`
    }
    var code = `
const draw = function() {
    ${draw}
}
const update = function() {
    ${update}
}
const marisa = {
        vs: \`${vs}\`,
        fs: \`${fs}\`,
        img: ${imgstr},
        draw: project => {
            draw.bind(project)()
        },
        update: project => {
            update.bind(project)()
        }
    };
    export default marisa`
    return code;
}

/**
 *  未来计划把材质、几何数据也拆分成独立的block来独立解析
 *  @ 方法占用了其他语言的装饰器功能，之后如果CodeBody复杂了再考虑预处理判断分离
 */


function parseCode(source) {
    const map = source.split("\r\n");
    var current;
    var end = false;
    const pool = {}
    map.map(line => {
        if (line.slice(0, 1) == "@") {
            switch (line.trim().toLocaleLowerCase()) {
                case "@glsl.vert":
                case "@vert":
                case "@vs":
                case "@glsl.vs":
                    current = "vs";
                    break;
                case "@glsl.frag":
                case "@frag":
                case "@fs":
                case "@glsl.fs":
                    current = "fs"
                    break;
                case "@draw":
                    current = "draw"
                    break;
                case "@update":
                    current = "update"
                    break;
                case "@image":
                    current = "img";
                    break;
                case "@desc":
                    current = null;
                    //注释内容
                    break;
                case "@end":
                default:
                    end = true;
                    break;
            }
        } else {
            if (end) return;
            if (current) {
                if (line == "") return;
                if (!pool[current]) pool[current] = []
                pool[current].push(line)
            }
        }
    })
    return pool
}

function marisa(options) {
    if (options === void 0) options = {};

    var filter = rollupPluginutils.createFilter(options.include, options.exclude);

    return {
        name: 'marisa',
        transform: function transform(source, id) {
            if (!filter(id)) return;
            var textArr = parseCode(source);
            //草这地方，一定要改，好弱智的写法，但是我现在不想改，又不是不能用
            var code = generateCode(textArr);
            var result = { code: code };
            return result
        }
    };
}

module.exports = marisa;