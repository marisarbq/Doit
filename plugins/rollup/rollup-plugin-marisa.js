'use strict';

function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var MagicString = _interopDefault(require('magic-string'));

/**
 * 此处
 * @param {体} body
 */
function generateCode(body) {
    const br = "\n";
    let expressions = [];

    //img
    let imgstr = `const img = []`
    if (body.img) {
        let imgarr = body.img.map(url => {
            return `"${url}"`
        })
        imgstr = `const img = [${imgarr.toString()}]`
    }
    expressions.push(imgstr)

    //shader
    let shader = `const shader = {}`
    if (body.shader) {
        for (let name in body.shader) {
            body.shader[name].vs = body.shader[name].vs.join(br);
            body.shader[name].fs = body.shader[name].fs.join(br);
        }
        shader = `const shader = ${JSON.stringify(body.shader)}`;
    }
    expressions.push(shader)

    let draw = `const draw = null`
    if (body.draw) {
        draw = `const draw = function() {${body.draw.join(br)}}`;
    }
    expressions.push(draw)

    let update = `const update = null`
    if (body.update) {
        update = `const update = function() {${body.update.join(br)}}`;
    }
    expressions.push(update)

    var code = `
    ${expressions.join(";\n")}
const marisa = {
    ${Object.keys(body).join(",")}
};
export default marisa`
    return code;
}

/**
 *  未来计划把材质、几何数据也拆分成独立的block来独立解析
 *  @ 方法占用了其他语言的装饰器功能，之后如果CodeBody复杂了再考虑预处理判断分离
 */

function praseLine(line) {
    let arr = line.split(" ");
    let cmd = {
        name: arr[0],
        prop: {}
    }
    arr.slice(1).map(str => {
        let k = str.split("=");
        cmd.prop[k[0]] = k[1];
    })
    return cmd
}


function parseCode(source) {
    const map = source.split("\r\n");
    var current;
    var end = false;
    const pool = {}
    let cmd;
    map.map(line => {
        if (line.slice(0, 1) == "@") {
            cmd = praseLine(line);
            switch (cmd.name.trim().toLocaleLowerCase()) {
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
                if (current == 'vs' || current == 'fs') {
                    if (!pool["shader"]) pool["shader"] = {}
                    if (!cmd.prop["name"]) cmd.prop["name"] = "default";
                    if (!pool["shader"][cmd.prop["name"]]) pool["shader"][cmd.prop["name"]] = {
                        vs: [],
                        fs: []
                    }
                    pool["shader"][cmd.prop["name"]][current].push(line)
                } else {
                    if (!pool[current]) pool[current] = []
                    pool[current].push(line)
                }
            }
        }
    })
    // console.log(pool);
    return pool
}

function marisa(options) {
    if (options === void 0) options = {};

    var filter = rollupPluginutils.createFilter(options.include, options.exclude);

    return {
        name: 'marisa',
        transform: function transform(source, id) {
            if (!filter(id)) return;
            var origin = parseCode(source);
            //草这地方，一定要改，好弱智的写法，但是我现在不想改，又不是不能用
            var code = generateCode(origin);
            var result = { code: code };
            return result
        }
    };
}

module.exports = marisa;