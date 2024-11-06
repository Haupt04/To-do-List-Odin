

export class ToDoList{
    constructor(title, description='', priority='low', dueDate=null){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.isCompleted = 'Incomplete';
        this.dueDate = dueDate;
    }

    markComplete(){
        this.isCompleted = this.isCompleted === 'Incomplete' ? 'Complete' : 'Incomplete';
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
            isCompleted: this.isCompleted,
            priority: this.priority,
            dueDate: this.dueDate,
        }
    }

    
}