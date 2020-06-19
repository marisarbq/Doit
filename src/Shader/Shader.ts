export default class Shader {
    shader: WebGLShader;
    isError: boolean = false;

    src: string;
    _glType: string;

    constructor(source: string, type: string) {
        this.src = source;
        this._glType = type;
        return this;
    }

    create(gl: WebGL2RenderingContext) {
        let t = this.getGLType(gl);
        this.shader = gl.createShader(t);
        gl.shaderSource(this.shader, this.src);
    }

    private getGLType(gl: WebGL2RenderingContext) {
        if (this._glType == "vert") {
            return gl.VERTEX_SHADER
        } else if (this._glType == "frag") {
            return gl.FRAGMENT_SHADER
        }
    }

    complete(gl: WebGL2RenderingContext) {
        this.create(gl);
        if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
            var info = gl.getShaderInfoLog(this.shader);
            throw info;

        }
        return this.shader;
    }
}