import {ToDo, ToDoList} from './classes'
import { createToDoHtml } from './js/components';

import './css/style.css';

export const todoList = new ToDoList();
todoList.toDos.forEach(createToDoHtml);
