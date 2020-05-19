interface SpeakingThing {
    speak(): void;
}
declare class Human implements SpeakingThing {
    private _name;
    constructor(name: string);
    speak(): void;
}
export { SpeakingThing, Human };
