import "./style.css";
import "@fortawesome/fontawesome-free/js/all";
import { ToDoProjects } from "./ToDoProjectClass.js";
import { format } from 'date-fns';


const myToDoProjects = new ToDoProjects();

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    // DOM Elements
    const openDialogButton = document.getElementById('openDialog');
    const dialog = document.getElementById('dialog');
    const cancelDialogButton = document.getElementById('cancelDialog');
    const submitDialogButton = document.getElementById('submitDialog');
    const taskNameInput = document.getElementById('TaskName');
    const descriptionInput = document.getElementById('Description');
    const prioritySelect = document.getElementById('dropDownMenu');
    const listProjects = document.getElementById('list-projects');
    const dueDateInput = document.getElementById('dueDate').value;

    // Open dialog when button is clicked
    openDialogButton.addEventListener('click', () => {
        console.log("Opening dialog...");
        dialog.showModal(); // Opens the dialog
    });

    // Close dialog when cancel button is clicked
    cancelDialogButton.addEventListener('click', () => {
        console.log("Cancel button clicked. Closing dialog...");
        dialog.close(); // Closes the dialog
    });

    // Handle form submission
    submitDialogButton.addEventListener('click', () => {
        console.log("Submitting task...");
        const title = taskNameInput.value;
        const description = descriptionInput.value;
        const priority = prioritySelect.value;
        const dueDate = dueDateInput.value; 

        const index = submitDialogButton.dataset.index;

        if (index !== undefined){
            myToDoProjects.updateItem(index,title,description,priority, dueDate);
        } else {
            myToDoProjects.addItem(title, description, priority, dueDate);
        }
        updateProjectDisplay();

        // Close the dialog and clear inputs
        dialog.close();
        taskNameInput.value = '';
        descriptionInput.value = '';
        prioritySelect.value = '';
        dueDateInput.value = '';
    });

    function updateProjectDisplay() {
        const items = myToDoProjects.getItems();
        listProjects.innerHTML = '';

        items.forEach((item, index) => {
            const summary = item.getSummary();
            const projectElement = document.createElement('div');
            projectElement.classList.add('task-item');

            const priorityClass = summary.priority === 'High' ? 'priority-high' : 'priority-low';
            const formattedDueDate = summary.dueDate ? format(new Date(summary.dueDate), "dd/MM/yyyy") : 'No due date';
            ;

            projectElement.innerHTML = `
            <p>Title: ${summary.title}, Description: ${summary.description}</p>
            <p>Due Date: ${formattedDueDate}</p>
            <button class="priority-button ${priorityClass}" disabled>${summary.priority}</button>
            <button class="edit-button" data-index="${index}">Edit</button>
            <button class="delete-button" data-index="${index}">Delete</button>
            `;
            console.log(projectElement.innerHTML);
            listProjects.appendChild(projectElement);
        });
    
    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = Number(event.target.getAttribute('data-index'));
            myToDoProjects.removeItem(index); // Remove the item from the list
            updateProjectDisplay(); // Update the displayed list
        });
    });

    const editButton = document.querySelectorAll('.edit-button');
    editButton.forEach(button => {
        button.addEventListener('click', (event) =>{
            const index = Number(event.target.getAttribute('data-index'));
            const item = myToDoProjects.getItems()[index];
            taskNameInput.value = item.getSummary().title;
            descriptionInput.value =item.getSummary().description;
            prioritySelect.value = item.getSummary().priority;
            dialog.showModal();
            submitDialogButton.dataset.index = index;
        });
    });


}})
