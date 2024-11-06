import { ToDoList } from "./ToDoList";
import { format } from 'date-fns';

export class ToDoProjects{
    constructor(){
        this.projects = { "Default Project": [] }; // Initialize with a default project
        this.currentProject = "Default Project"; // Track the current project
        this.loadProjectsFromStorage();
        if (!this.projects["Default Project"]) {
            this.addProject("Default Project");  // Only add if it doesn't already exist
        }
    }

    addProject(projectName) {
        if (!this.projects[projectName]) {
            this.projects[projectName] = []; // Create a new to-do list for the project
            this.saveProjectsToStorage();
            // this.updateProjectSelector();
        } else {
            console.log(`Project "${projectName}" already exists.`);
        }
    }

    removeItem(index) {
        const projectItems = this.projects[this.currentProject];
        if (projectItems && index >= 0 && index < projectItems.length) {
            projectItems.splice(index, 1);  // Remove item from the list
        } else {
            console.error('Invalid item index.');
        }
    }

    removeProject(projectName) {
        if (projectName in this.projects && projectName !== "Default Project") {
            delete this.projects[projectName];
        } else {
            console.error("Cannot delete default project or non-existent project.");
        }
    }

    addItem(title, description = '', priority = 'low', dueDate = null) {
        const newItem = new ToDoList(title, description, priority, dueDate);
        this.projects[this.currentProject].push(newItem);
    }

    getItems() {
        return this.projects[this.currentProject] || []; // Return items in the project or an empty list
    }


    updateItem(index, title, description, priority, dueDate) {
        const item = this.projects[this.currentProject][index];
        if (item) {
            item.title = title;
            item.description = description;
            item.priority = priority;
            item.dueDate = dueDate;
        }
    }

    setCurrentProject(projectName) {
        if (projectName in this.projects) {
            this.currentProject = projectName;
        }
    }


    saveProjectsToStorage() {
        try {
            localStorage.setItem('projects', JSON.stringify(this.projects)); // Save projects
            console.log('Projects saved to localStorage:', this.projects); // Debugging line
        } catch (e) {
            console.error('Failed to save projects:', e); // In case of saving error
        }
    }

    loadProjectsFromStorage() {
        const savedProjects = localStorage.getItem('projects');
        if (savedProjects) {
            this.projects = JSON.parse(savedProjects);
    
            // Re-create ToDoList instances for each item in each project
            for (const projectName in this.projects) {
                this.projects[projectName] = this.projects[projectName].map(itemData => {
                    // Assuming itemData has properties that match ToDoList's constructor
                    return new ToDoList(itemData.title, itemData.description, itemData.priority, itemData.dueDate);
                });
            }
    
            // Get the project selector element
            const projectSelector = document.getElementById('projectSelector');
            projectSelector.innerHTML = '';  // Clear existing options
    
            // Populate projectSelector dropdown with projects from storage
            Object.keys(this.projects).forEach((projectName) => {
                const option = document.createElement('option');
                option.value = projectName;
                option.textContent = projectName;
                projectSelector.appendChild(option);
            });
    
            // Set the default project if it exists
            if (this.projects[this.currentProject]) {
                this.setCurrentProject(this.currentProject);
                projectSelector.value = this.currentProject;
            }
        }
    }
    
    

    updateProjectSelector() {
        const projectSelector = document.getElementById('projectSelector');
        projectSelector.innerHTML = '';  // Clear current options

        // Populate the selector with project options from the projects object
        for (const projectName in this.projects) {
            const newOption = document.createElement('option');
            newOption.value = projectName;
            newOption.textContent = projectName;
            projectSelector.appendChild(newOption);
        }


}}