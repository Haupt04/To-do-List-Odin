import "./style.css";
import "@fortawesome/fontawesome-free/js/all";
import { ToDoProjects } from "./ToDoProjectClass.js";
import { format } from 'date-fns';


const myToDoProjects = new ToDoProjects();
let currentProject = 'Default Project';
myToDoProjects.addProject(currentProject);

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    // Load Projects from Storage
    myToDoProjects.loadProjectsFromStorage();
    // Initialize the current project
    myToDoProjects.setCurrentProject(currentProject);

    const openDialogButton = document.getElementById('openDialog');
    const dialog = document.getElementById('dialog');
    const cancelDialogButton = document.getElementById('cancelDialog');
    const submitDialogButton = document.getElementById('submitDialog');
    const taskNameInput = document.getElementById('TaskName');
    const descriptionInput = document.getElementById('Description');
    const prioritySelect = document.getElementById('dropDownMenu');
    const listProjects = document.getElementById('list-projects');
    const dueDateInput = document.getElementById('dueDate');
    const projectSelector = document.getElementById('projectSelector');
    
    // Handle Create New Project
    document.getElementById('newProjectButton').addEventListener('click', () => {
        const projectName = prompt("Enter the new project name:");
        if (projectName && !myToDoProjects.projects[projectName]) {
            myToDoProjects.addProject(projectName);
            const newOption = document.createElement('option');
            newOption.value = projectName;
            newOption.textContent = projectName;
            projectSelector.appendChild(newOption);
            projectSelector.value = projectName; // Switch to new project
            myToDoProjects.setCurrentProject(projectName);

            // Save projects to localStorage after a new project is added
            myToDoProjects.saveProjectsToStorage();

            updateProjectDisplay();

            

        } else {
            alert("Project name is required or already exists!");
        }
    });

    // Handle Delete Project
    document.getElementById('deleteProjectButton').addEventListener('click', () => {
        const selectedProject = projectSelector.value;
        if (selectedProject !== 'Default Project') {
            myToDoProjects.removeProject(selectedProject);
            projectSelector.removeChild(projectSelector.querySelector(`option[value="${selectedProject}"]`));
            projectSelector.value = 'Default Project';
            myToDoProjects.setCurrentProject('Default Project');
            updateProjectDisplay();

            // Save projects to localStorage after a new project is added
            myToDoProjects.saveProjectsToStorage();

        } else {
            alert("Cannot delete the Default Project");
        }
    });

    // Handle Project Switching
    projectSelector.addEventListener('change', (event) => {
        const selectedProject = event.target.value;
        myToDoProjects.setCurrentProject(selectedProject);
        updateProjectDisplay();
    });


    openDialogButton.addEventListener('click', () => {
        console.log("Creating a new task...");
        dialog.showModal(); // Open the task creation dialog
    });

    
    cancelDialogButton.addEventListener('click', () => {
        console.log("Cancel button clicked. Closing dialog...");
        dialog.close(); // This closes the dialog
    });

    // Handle form submission
    submitDialogButton.addEventListener('click', () => {
        console.log("Submitting task...");
        const title = taskNameInput.value;
        const description = descriptionInput.value;
        const priority = prioritySelect.value;
        const dueDate = dueDateInput.value;

        const index = submitDialogButton.dataset.index;

        if (index !== undefined) {
            myToDoProjects.updateItem(index, title, description, priority, dueDate);
        } else {
            myToDoProjects.addItem(title, description, priority, dueDate);  // Correct method name
        }
        

        // Save projects to localStorage after task is added or updated
        myToDoProjects.saveProjectsToStorage();

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

            projectElement.innerHTML = `
            <p>Title: ${summary.title}</p>
            <p>Description: ${summary.description}</p>
            <p>Due Date: ${formattedDueDate}</p>
            <button class="priority-button ${priorityClass}" disabled>${summary.priority}</button>
            <button class="edit-button" data-index="${index}">Edit</button>
            <button class="delete-button" data-index="${index}">Delete</button>
            <button class="incomplete-completeBtn" data-index="${index}">${summary.isCompleted}</button>
            `;
            listProjects.appendChild(projectElement);
        });

        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = Number(event.target.getAttribute('data-index'));
                myToDoProjects.removeItem(index); // Remove the item from the list
                updateProjectDisplay(); // Update the displayed list

                // Save projects to localStorage after a new project is added
                myToDoProjects.saveProjectsToStorage();

            });
        });

        // Add event listeners for edit buttons
        const editButton = document.querySelectorAll('.edit-button');
        editButton.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = Number(event.target.getAttribute('data-index'));
                const item = myToDoProjects.getItems()[index];
                taskNameInput.value = item.getSummary().title;
                descriptionInput.value = item.getSummary().description;
                prioritySelect.value = item.getSummary().priority;
                dialog.showModal();
                submitDialogButton.dataset.index = index;
            });
        });

        // Add event listeners for completed/incomplete buttons
        const InComBtn = document.querySelectorAll('.incomplete-completeBtn');
        InComBtn.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = Number(event.target.getAttribute('data-index'));
                const item = myToDoProjects.getItems()[index];
                item.markComplete();
                updateProjectDisplay(); // Update the displayed list
            });
        });
    }

});
