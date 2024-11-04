

export function creatingTasks(){
    const dialog = document.getElementById('dialog');
    const openButton = document.getElementById('openDialog');
    const cancelButton = document.getElementById('cancelDialog');
    const submitButton = document.getElementById('submitDialog');
    const TaskName = document.getElementById('TaskName');
    const Description = document.getElementById('Description');
    const dropdownMenu = document.getElementById('dropDownMenu');
    const mainDoc = document.getElementById('main-doc');

    // Open dialog on button click
    openButton.addEventListener('click', () => dialog.showModal());

    cancelButton.addEventListener('click', ()=> dialog.close());

    submitButton.addEventListener('click', () => {
        const newDiv = document.createElement('div');
        const paragraphName = document.createElement('p');
        const paragraphDescription = document.createElement('p');
        const PrivortyLevelBtn= document.createElement('button');
        const deleteButton = document.createElement('button');
        const CompletedIncompleteBtn = document.createElement('button');

        CompletedIncompleteBtn.className = 'completedBtn';
        PrivortyLevelBtn.className = 'privortybtn';
        deleteButton.className = 'delete-button';
        newDiv.className = 'NewDiv';

        

        paragraphName.textContent = 'Task to do: ' + TaskName.value;
        paragraphDescription.textContent = 'Description of task: ' +  Description.value;
        deleteButton.textContent = 'Delete';
        CompletedIncompleteBtn.textContent ='Incomplete';
        
        
        const valuePl = dropdownMenu.value;
        if (valuePl === 'high') {
            PrivortyLevelBtn.style.backgroundColor = 'red';
            PrivortyLevelBtn.textContent = 'High Importance';
        } else if (valuePl === 'low') {
            PrivortyLevelBtn.style.backgroundColor = 'green';
            PrivortyLevelBtn.textContent = 'Low Importance';
        } else {
            PrivortyLevelBtn.style.backgroundColor = 'white';
        }
        
        deleteButton.addEventListener('click', ()=> {
            newDiv.remove();
        })

    
        

        newDiv.append(paragraphName);
        newDiv.append(paragraphDescription);
        newDiv.append(PrivortyLevelBtn);
        newDiv.append(deleteButton);
        newDiv.append(CompletedIncompleteBtn);
        mainDoc.append(newDiv);

        CompletedIncompleteBtn.addEventListener('click', (event) => {
            CompletedIncompleteChange(event); // Pass the event
        });

        TaskName.value = '';
        Description.value = '';
        dropdownMenu.value = '';
        
        //close the dialog window
        dialog.close();
})};



export function CompletedIncompleteChange(event){
    const button = event.target;
    console.log(button.textContent);
    const ValuePbtn = button.textContent;

    if (ValuePbtn === 'Incomplete'){
        button.style.backgroundColor = 'green';
        button.textContent = 'Complete';
    } else if (ValuePbtn === 'Complete'){
        button.style.backgroundColor = 'red';
        button.textContent = 'Incomplete';
    }
    




}
