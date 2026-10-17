function refreshApp(){
    searchRecords();

    updateTotalRecords();
    updateTotalSpending();
    updateTopCategory();
    updateSpendingCap();
    updateWeeklyChart();
}



const form = document.getElementById('record-form');
const feedbackContainer = document.getElementById('form-feedback');
const description = document.getElementById('record-description')
// const addRecordButton = document.getElementById('submit-record')



description.addEventListener('input', function () {
    const descriptionValue = description.value;
    const isValid = validateDescription(descriptionValue);

    description.classList.remove('field-invalid', 'field-valid');

    if (descriptionValue.length === 0) {
        return;
    }

    if (isValid) {
        description.classList.add('field-valid');
    } else {
        description.classList.add('field-invalid');
    }
});

function doSomething(event) {
    
    event.preventDefault();
    
    const descriptionValue = description.value

    const isValid_description = validateDescription(descriptionValue)
    console.log(isValid_description)

    const amount = document.getElementById('record-amount')
    const amountValue = amount.value

    const isValid_amount = validateAmount(amountValue)
    console.log(isValid_amount)

    const date = document.getElementById('record-date')
    const dateValue = date.value
    const isValid_date = validateDate(dateValue)
    console.log(isValid_date)


    const category = document.getElementById('record-category')
    const categoryValue = category.value
    const isValid_category = validateCategory(categoryValue)
    console.log(isValid_category)

    const isFormValid = isValid_description && isValid_amount && isValid_category && isValid_date
    console.log(isFormValid)

    
    if (isFormValid === false) {
        feedbackContainer.textContent = 'Invalid input. Please check your text';

    }else{
        feedbackContainer.textContent = 'All fields are valid';
        const timestamp = new Date().toISOString();
        let newRecord = {
            'id': counter,
            'description': descriptionValue,
            'amount': Number(amountValue),
            'category': categoryValue,
            'date': dateValue,
            'createdAt': timestamp,
            'updatedAt': timestamp

        }
        counter++
        records.push(newRecord)

        savedRecords(records);
        refreshApp();

        form.reset();
    }
}
form.addEventListener('submit', doSomething)

const tableBody = document.getElementById('records-table-body');


tableBody.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {

    const recordId = Number(event.target.dataset.id);

    const index = records.findIndex(record => record.id === recordId);
    
    if (index === -1) {
      return; 
    }

    const isConfirmed = confirm("Do you want to delete this record permanently?");

    if (!isConfirmed){
        return;
    }
    
    records.splice(index, 1);

    savedRecords(records);
    refreshApp();
}

if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit'){

    const recordId = Number(event.target.dataset.id);
    const record = records.find(record => record.id === recordId);
    console.log('Record to edit: ', record);

    if(!record){
        return;
    }

    const row = event.target.closest('tr');
    console.log('Selected row:', row);

    const descriptionCell = row.cells[0];
    const descriptionInput = document.createElement('input');

    descriptionInput.type = 'text';
    descriptionInput.value = record.description;
    descriptionInput.setAttribute('aria-label', 'Edit description');

    descriptionCell.replaceChildren(descriptionInput);

    descriptionInput.focus();



    const amountCell = row.cells[1];
    const amountInput = document.createElement('input');

    amountInput.type = 'text';
    amountInput.inputMode = 'decimal';
    amountInput.value = record.amount;
    amountInput.setAttribute('aria-label', 'Edit amount in RWf'); 
    amountInput.title = 'enter the amount in RWF';

    amountCell.replaceChildren(amountInput);

    const categoryCell = row.cells[2];
    const categoryInput = document.createElement('input');


    categoryInput.type = 'text';
    categoryInput.value = record.category;
    categoryInput.setAttribute('aria-label', 'Edit category');
    categoryCell.replaceChildren(categoryInput)


    const dateCell = row.cells[3];
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = record.date;
    dateInput.setAttribute('aria-label', 'Edit date');
    dateCell.replaceChildren(dateInput);


    // displaying save and cancel buttons
    //we will use the last cell in the table

    const actionsCell = row.cells[4];

    const saveButton = document.createElement('button');
    saveButton.classList.add('record-button', 'record-button-save');


    saveButton.type = 'button';
    saveButton.textContent = 'Save';
    saveButton.dataset.id = record.id;

    const cancelButton = document.createElement('button');

    cancelButton.classList.add('record-button', 'record-button-cancel')

    cancelButton.type = 'button';
    cancelButton.dataset.id = record.id;
    cancelButton.textContent = 'Cancel';


    actionsCell.replaceChildren(saveButton, cancelButton);


}

    // i am creating the condition to give meaningfull use of save and cancel button


if(event.target.tagName === 'BUTTON' && event.target.textContent === 'Save'){

    const recordId = Number(event.target.dataset.id);
    const record = records.find(record => record.id === recordId);

    if(!record){
        return;
    }



    const row = event.target.closest('tr');
    console.log('Saving record:', record);
    console.log('Editing row:', row );

    // i will retrieve the edited values which are currently in the input element


    const descriptionValue = row.cells[0].querySelector('input').value;
    const amountValue = row.cells[1].querySelector('input').value;
    const categoryValue = row.cells[2].querySelector('input').value;
    const dateValue = row.cells[3].querySelector('input').value;

    // i must validate the data the user enter

    const isFormValid = validateDescription(descriptionValue) && validateAmount(amountValue) && validateCategory(categoryValue) && validateDate(dateValue);

    if(!isFormValid){
        alert('Invalid inputs!');
        return;

    }

    record.description = descriptionValue;
    record.amount = Number(amountValue);
    record.category = categoryValue;
    record.date = dateValue;
    record.updatedAt = new Date().toISOString();

    savedRecords(records);
    refreshApp();

}

if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Cancel'){
    searchRecords();
}




});



refreshApp();


// validating imported records

function validateImportedRecords(data){
    if(!Array.isArray(data)){
        return false;
    }

    const ids = new Set();

    for (const record of data){
        if(!record || typeof record !== 'object' || Array.isArray(record)){
            return false;
        }

        // i will check unique ids

        if(!Number.isSafeInteger(record.id) || record.id < 1){
            return false;
        }

        if(ids.has(record.id)){
            return false;
        }

        ids.add(record.id);

        // i will also validate record fields


        if(!validateDescription(record.description)){
            return false;
        }

        if(typeof record.amount !== 'number' || !Number.isFinite(record.amount) || !validateAmount(String(record.amount))){
            return false;
        }

        if(!validateCategory(record.category)){
            return false;

        }

        if(!validateDate(record.date)){
            return false;

        }

        // i will also validate the timestamps

        if (typeof record.createdAt !== 'string' || Number.isNaN(Date.parse(record.createdAt))){
            return false;
        }

        if(typeof record.updatedAt !== 'string' || Number.isNaN(Date.parse(record.updatedAt))){
            return false;
        }

        if(Date.parse(record.updatedAt) < Date.parse(record.createdAt)){
            return false;
        }
    }
    return true;
}




const importButton = document.getElementById('import-records');
const importFile = document.getElementById('import-file');

importButton.addEventListener('click', function(){
    importFile.click();
});

importFile.addEventListener('change', function(){

    const file = importFile.files[0];

    if(!file){
        return;
    }

    const reader = new FileReader();

    reader.onload = function(){
        try{
            // records = JSON.parse(reader.result);

            const importedRecords = JSON.parse(reader.result);

            // i validate before modifying existing records

            if(!validateImportedRecords(importedRecords)){
                alert('Invalid JSON structure or record data');
                return;
            }

            const confirmed = confirm(
                'Importing will replace your existing records. Continue?'
            );

            if(!confirmed){
                return;
            }

            records = importedRecords;

            counter = records.reduce((max, record) => Math.max(max, record.id),0) + 1;

            

            savedRecords(records);
            refreshApp();

            alert('Import is successful');

        }catch(error){
            console.error('Import error:', error);
            alert('Failed to read JSON file')

        }finally{
            importFile.value = '';
        }
    };

    reader.onerror = function(){
        alert('Failed to read the selected file')
        importFile.value = '';
    };

    reader.readAsText(file);

    // if(file){
    //     reader.readAsText(file);
    // }
});


const exportButton = document.getElementById('export-records');

exportButton.addEventListener('click', function(){
    const jsonData = JSON.stringify(records, null, 2);

    const file = new Blob([jsonData], { type: 'application/json' });



    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'records.json';
    link.click();

});