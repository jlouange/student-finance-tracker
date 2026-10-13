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
    updateTopCategory();
  }
});

renderRecords(records);
updateTotalRecords();
updateTotalSpending();
updateTopCategory();