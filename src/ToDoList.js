

export class ToDoList{
    constructor(title, description='', priority='low', dueDate=null){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.IsCompleted = false;
        this.dueDate = dueDate;
    }

    markComplete(){
        this.IsCompleted = !this.IsCompleted;
    }
    
    updatePriority(newPriority){
        this.priority = newPriority;
    }

    setDueDate(date){
        this.dueDate = date;
    }

    getSummary(){
        return {
            title: this.title,
            description: this.description,
            isCompleted: this.IsCompleted,
            priority: this.priority,
            dueDate: this.dueDate,
        }
    }
}