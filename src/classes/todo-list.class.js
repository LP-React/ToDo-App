import { ToDo } from './todo.class'

export class ToDoList {
    constructor() {
        this.loadLocalStorage();
    }

    newToDo(toDo) {
        this.toDos.push(toDo);
        this.saveLocalStorage();
    }

    deleteToDo(id) {
        this.toDos = this.toDos.filter(toDo => toDo.id != id);
        this.saveLocalStorage();
    }

    checkComplete(id) {
        for (const toDo of this.toDos) {
            if (toDo.id == id) {
                toDo.completed = !toDo.completed;
                this.saveLocalStorage();
                break;
            }
        }
    }
    deleteComplete() {
        this.toDos = this.toDos.filter(toDo => !toDo.completed);
        this.saveLocalStorage();
    }

    saveLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.toDos));
    }

    loadLocalStorage() {
        this.toDos = (localStorage.getItem('todo'))
            ? JSON.parse(localStorage.getItem('todo'))
            : [];

        this.toDos = this.toDos.map(ToDo.fromJson);
    }
}