class Test {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const me = new Test('Tyrone')
console.log(me.name)