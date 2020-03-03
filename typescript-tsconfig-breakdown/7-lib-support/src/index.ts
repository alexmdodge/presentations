
interface SpeakingThing {
  speak(): void;
}

class Human implements SpeakingThing {
  private _name: string

  public constructor(name: string) {
    this._name = name
  }

  public speak() {
    const brokenWords = new Map()
    brokenWords.set('first', 'Hello, my')
    brokenWords.set('second', ' name is ')
    brokenWords.set('third', this._name)

    brokenWords.forEach(word => console.log(word))
  }
}

export {
  Human
}