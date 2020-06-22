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
    vs: string,
    fs: string,
    draw: <Function>(prj: any) => void;
}

declare module '*.marisa' {
    const value: IMarisa
    export default value
}