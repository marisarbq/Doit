'use strict';

function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var MagicString = _interopDefault(require('magic-string'));

// function compressShader(source) {
//   var needNewline = false;
//   return source.replace(/\\(?:\r\n|\n\r|\n|\r)|\/\*.*?\*\/|\/\/(?:\\(?:\r\n|\n\r|\n|\r)|[^\n\r])*/g, "").split(/\n+/).reduce(function (result, line) {
//     line = line.trim().replace(/\s{2,}|\t/, " ");
//     if (line[0] === '#') {
//       if (needNewline) {
//         result.push("\n");
//       }

//       result.push(line, "\n");
//       needNewline = false
//     } else {
//       result.push(line
//         .replace(/\s*({|}|=|\*|,|\+|\/|>|<|&|\||\[|\]|\(|\)|\-|!|;)\s*/g, "$1"))
//       needNewline = true;
//     }
//     return result;
//   }, []).join('').replace(/\n+/g, "\n");
// }

function generateCode(vs, fs, js) {
    var code = `
const fn = function() {
    ${js}
}
const marisa = {
        vs: \`${vs}\`,
        fs: \`${fs}\`,
        draw: project => {
            fn.bind(project)()
        }
    };
    export default marisa`
    return code;
}

function parseCode(source) {
    const map = source.split("\r\n");
    var pool = {
        fs: [],
        vs: [],
        js: []
    };
    var current;
    var end = false;
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
                case "@javascript":
                case "@typescript":
                case "@js":
                case "@ts":
                    current = "js"
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
                pool[current].push(line)
            }
        }
    })
    const br = `
`
    const code = {
        vs: pool.vs.join(br),
        fs: pool.fs.join(br),
        js: pool.js.join(br),
    }
    // console.log(code);
    return code
}

function marisa(options) {
    if (options === void 0) options = {};

    var filter = rollupPluginutils.createFilter(options.include, options.exclude);

    return {
        name: 'marisa',

        transform: function transform(source, id) {
            if (!filter(id)) return;
            var obj = parseCode(source);
            var code = generateCode(obj.vs, obj.fs, obj.js);
            var result = { code: code };
            return result
        }
    };
}

module.exports = marisa;