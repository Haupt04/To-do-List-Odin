import { ToDoList } from "./ToDoList";
import { format } from 'date-fns';

export class ToDoProjects{
    constructor(){
        this.items = []; //Array that holds the to-do objects
    }

    addItem(title,description='', priority='low', dueDate=null){
        const newItem = new ToDoList(title,description,priority,dueDate);
        this.items.push(newItem);
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1); // Remove item from the list
        }
    }

    getItems() {
        return this.items; // Return the list of items
    }

    updateItem(index, title, description, priority, dueDate) {
        const item = this.items[index];
        item.title = title;
        item.description = description;
        item.priority = priority;
        item.dueDate = dueDate;
    }

}