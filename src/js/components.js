import { ToDo } from '../classes'
import { todoList } from '../index'

//HTML references
const divToDoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnDeleteCompleted = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilter = document.querySelectorAll('.filtro')

export const createToDoHtml = (toDo) => {
    const htmlToDo = `<li class="${(toDo.completed) ? 'completed' : ''}" data-id="${toDo.id}">
                            <div class="view">
                                <input class="toggle" type="checkbox" ${(toDo.completed) ? 'checked' : ''}>
                                <label>${toDo.nameToDo}</label>
                             <button class="destroy"></button>
                            </div>
                            <input class="edit" value="Create a TodoMVC template">
                        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlToDo;

    divToDoList.append(div.firstElementChild);

    return div.firstElementChild;

}

// Events

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const newToDo = new ToDo(txtInput.value);
        todoList.newToDo(newToDo);
        console.log(todoList);
        createToDoHtml(newToDo);

        txtInput.value = '';
    }
});

divToDoList.addEventListener('click', (event) => {
    const nameElement = event.target.localName;
    const toDoElement = event.target.parentElement.parentElement;
    const toDoId = toDoElement.getAttribute('data-id');

    if (nameElement.includes('input')) {
        todoList.checkComplete(toDoId);
        toDoElement.classList.toggle('completed');
    } else if (nameElement.includes('button')) {
        todoList.deleteToDo(toDoId);
        divToDoList.removeChild(toDoElement);
    }
})

btnDeleteCompleted.addEventListener('click', () => {
    todoList.deleteComplete();

    for (let i = divToDoList.children.length - 1; i >= 0; i--) {
        const elemento = divToDoList.children[i];

        if (elemento.classList.contains('completed')) {
            divToDoList.removeChild(elemento);
        }
    }
})

ulFilters.addEventListener('click', (event) => {
    const filter = event.target.text;
    if (!filter) {
        return;
    }

    anchorFilter.forEach(elem => elem.classList.remove('selected'));


    for (const element of divToDoList.children) {
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');
        event.target.classList.add('selected')

        switch (filter) {
            case 'Pending':
                if (completed) {
                    element.classList.add('hidden');
                }
                break;
            case 'Completed':
                if (!completed) {
                    element.classList.add('hidden');
                }
                break;
        }
    }
})