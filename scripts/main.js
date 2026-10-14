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
        let newRecord = {
            'id': counter,
            'description': descriptionValue,
            'amount': Number(amountValue),
            'category': categoryValue,
            'date': dateValue
        }
        counter++
        records.push(newRecord)

        savedRecords(records);
        renderRecords(records);
        updateTotalRecords();
        updateTotalSpending();
        updateSpendingCap();
        updateTopCategory();

        form.reset();
    }
}
form.addEventListener('submit', doSomething)

const tableBody = document.getElementById('records-table-body');


tableBody.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {

    const recordId = Number(event.target.dataset.id);

    const index = records.findIndex(record => record.id === recordId);
    
    if (index !== -1) {
      records.splice(index, 1); 
    }
    
    savedRecords(records);
    renderRecords(records);
    updateTotalRecords();
    updateTotalSpending();
    updateSpendingCap();
    updateTopCategory();
  }
});

renderRecords(records);
updateTotalRecords();
updateTotalSpending();
updateSpendingCap();
updateTopCategory();


const importButton = document.getElementById('import-records');
const importFile = document.getElementById('import-file');

importButton.addEventListener('click', function(){
    importFile.click();
});

importFile.addEventListener('change', function(){

    const file = importFile.files[0];
    const reader = new FileReader();

    reader.onload = function(){
        try{
            records = JSON.parse(reader.result);

            if(!Array.isArray(records)){
                alert('Invalid file!');
                return;
            }

            savedRecords(records);
            renderRecords(records);
            updateTotalRecords();
            updateTotalSpending();
            updateTopCategory();
            updateSpendingCap();

            alert('Import is successful');

        }catch(error){
            alert('Failed to read JSON file')

        }
    };

    if(file){
        reader.readAsText(file);
    }
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