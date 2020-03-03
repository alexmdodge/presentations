
class Human {
  private _name: string

  public constructor(name: string) {
    this._name = name
  }

  public speak() {
    console.log(`Hello, my name is ${this._name}`)
  }
}

export {
  Human
}