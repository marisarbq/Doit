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
        console.log(this._glType,t);
        this.shader = gl.createShader(t);
        gl.shaderSource(this.shader, this.src.trim());
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
        gl.compileShader(this.shader);
        if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
            var info = gl.getShaderInfoLog(this.shader);
            console.error(info,this);
            this.isError = true;
            throw info;

        }
        return this.shader;
    }
}