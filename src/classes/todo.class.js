export class ToDo {

    static fromJson({id, nameToDo, completed, created}) {

        const tempToDo = new ToDo(nameToDo);

        tempToDo.id = id;
        tempToDo.completed = completed;
        tempToDo.created = created;

        return tempToDo;
    }

    constructor(nameToDo) {
        this.nameToDo = nameToDo;
        this.id = new Date().getTime();
        this.completed = false;
        this.created = new Date();
    }

    printClass() {
        console.log(`${this.nameToDo} - ${this.id}`)
    }
}