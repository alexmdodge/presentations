class Human {
    constructor(name) {
        this._name = name;
    }
    speak() {
        console.log(`Hello, my name is ${this._name}`);
    }
}
export { Human };
