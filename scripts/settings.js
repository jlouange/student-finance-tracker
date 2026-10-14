const spendingLimitInput = document.getElementById('spending-limit');
const saveSpendingCapButton = document.getElementById('save-spending-cap');
const capAmount = document.getElementById('cap-amount');
const capMessage = document.getElementById('cap-message');

let spendingCap = Number(localStorage.getItem('spendingCap')) || 0;

function updateSpendingCap(){
    capAmount.textContent = `RWF ${spendingCap}`;

    const totalSpending = records.reduce(
        (sum, record) => sum + Number(record.amount), 0

    );

    if (spendingCap === 0){
        capMessage.textContent = 'Set a spending cap in settings';

    } else if (totalSpending > spendingCap){
        capMessage.textContent = 'Yoou have exceeded your spending limit'

    }else if (totalSpending >= spendingCap * 0.8){
        capMessage.textContent = 'you have use 80% 0f your spending limit'

    }else{
        capMessage.textContent = 'you are within your spending limit';
    }
}

saveSpendingCapButton.addEventListener('click', function(){
    const value= spendingLimitInput.value;


    if (value.trim() === '' || !Number.isFinite(Number(value)) || Number(value) <= 0){
        capMessage.textContent = 'please enter a sending limit greater than zero';
        return;
    }

    spendingCap = Number(value);
    localStorage.setItem('spendingCap', spendingCap);
    updateSpendingCap();
    document.getElementById('spending-limit').value = '';
});



const categoryInput = document.getElementById('new-category');
const addCategoryutton = document.getElementById('add-category');
const categoryList = document.getElementById('category-list');
const recordCategorySelect = document.getElementById('record-category');

const defaultCategories = ['Food', 'ooks','Transport', 'Entertainment','Fees', 'Other'];

let categories = JSON.parse(localStorage.getItem('categories')) || defaultCategories;


function renderCategories(){
    categoryList.innerHTML = '';
    recordCategorySelect.innerHTML = '<option value="" disabled selected>Choose a category</option>';


    categories.forEach(function(category){

        const listItem = document.createElement('li');
        const categoryName = document.createElement('span');
        const removeButton = document.createElement('button');


        categoryName.textContent = category;
        removeButton.textContent = 'REMOVE';

        removeButton.type = 'button';

        removeButton.addEventListener('click', function(){
            categories = categories.filter(function(item){
                return item !== category;
            });

            localStorage.setItem('categories', JSON.stringify(categories));

            renderCategories();
        });

        listItem.append(categoryName, removeButton);
        categoryList.appendChild(listItem);

        const option = document.createElement('option')
        option.value = category.toLowerCase();
        option.textContent = category;

        recordCategorySelect.appendChild(option);
    });
}

addCategoryutton.addEventListener('click', function(){
    const newCategory = categoryInput.value.trim();

    if (newCategory === ''){
        alert("Please enter a category name.")
        return;
    }

    const alreadyExists = categories.some(function(category){
        return category.toLowerCase() === newCategory.toLowerCase();
    });

    if (alreadyExists){
        alert('This category already exists')
        return;
    }

    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));

    renderCategories();
    categoryInput.value = '';
})



renderCategories();