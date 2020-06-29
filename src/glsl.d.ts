declare module '*.glsl' {
    const value: string
    export default value
}

declare module '*.frag' {
    const value: string
    export default value
}

declare module '*.vert' {
    const value: string
    export default value
}


declare module '*.vs' {
    const value: string
    export default value
}

declare module '*.fs' {
    const value: string
    export default value
}

interface IMarisa {
    shader: { [name: string]: { vs: string, fs: string } }
    img: string[],
    draw: <Function>(prj: any) => void;
    update: <Function>(prj: any) => void;
}

declare module '*.marisa' {
    const value: IMarisa
    export default value
}

interface IWASDStatus {
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;
}

interface IPointer {
    mx: number;
    my: number;
    update: boolean;
    enable: boolean;
    lock: boolean;
}