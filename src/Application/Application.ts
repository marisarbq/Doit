export default class Application {
    name: string;
    targetSystem: string[] = []

    constructor(name: string) {
        this.name = name || "Unknown Application"
    }
}