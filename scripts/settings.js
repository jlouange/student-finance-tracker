const spendingLimitInput = document.getElementById('spending-limit');
const saveSpendingCapButton = document.getElementById('save-spending-cap');
const capAmount = document.getElementById('cap-amount');
const capMessage = document.getElementById('cap-message');

let spendingCap = Number(localStorage.getItem('spendingCap')) || 0;

spendingLimitInput.value = spendingCap > 0 ? spendingCap : '';

function updateSpendingCap(){
    capAmount.textContent = formatCurrency(spendingCap);

    const totalSpending = records.reduce(
        (sum, record) => sum + Number(record.amount), 0

    );

    // if (spendingCap === 0){
    //     capMessage.textContent = 'Set a spending cap in settings';

    // } else if (totalSpending > spendingCap){
    //     capMessage.textContent = 'Yoou have exceeded your spending limit'

    // }else if (totalSpending >= spendingCap * 0.8){
    //     capMessage.textContent = 'you have use 80% 0f your spending limit'

    // }else{
    //     capMessage.textContent = 'you are within your spending limit';
    // }

    capMessage.classList.remove('warning', 'exceeded');

    if(spendingCap <= 0){
        capMessage.textContent = 'Set a spending cap in settings.';

        capMessage.setAttribute('aria-live', 'polite');

        return;
    }


    const remaining = spendingCap - totalSpending;

    if(remaining < 0){
        const overage = Math.abs(remaining);

        capMessage.textContent = `Spending cap exceeded by ${formatCurrency(overage)}.`

        capMessage.classList.add('exceeded');

        capMessage.setAttribute('aria-live', 'assertive');

    }

    else if (totalSpending >= spendingCap * 0.8){
        capMessage.textContent = `Warning: Only ${formatCurrency(remaining)} remaining.`

        capMessage.classList.add('warning');

        capMessage.setAttribute('aria-live', 'polite');


    }

    else{

        capMessage.textContent = `You have ${formatCurrency(remaining)} remaining.`;

        capMessage.setAttribute('aria-live', 'polite')
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
    // document.getElementById('spending-limit').value = '';
});



const categoryInput = document.getElementById('new-category');
const addCategorButton = document.getElementById('add-category');
const categoryList = document.getElementById('category-list');
const recordCategorySelect = document.getElementById('record-category');

const defaultCategories = ['Food', 'Books','Transport', 'Entertainment','Fees', 'Other'];

let categories;

try{
    const saved = JSON.parse(localStorage.getItem('categories'));

    categories = Array.isArray(saved) ? saved : [...defaultCategories];
    }catch(error){
        categories = [...defaultCategories];
    }


function renderCategories(){

    const previouslySelected = recordCategorySelect.value;

    if(categories.includes(previouslySelected)){
        recordCategorySelect.value = previouslySelected;
    }
    categoryList.innerHTML = '';
    recordCategorySelect.innerHTML = '<option value="" disabled selected>Choose a category</option>';


    categories.forEach(function(category){

        const listItem = document.createElement('li');
        const categoryName = document.createElement('span');
        const removeButton = document.createElement('button');


        const editButton = document.createElement('button');

        editButton.type = 'button';
        editButton.textContent = 'Edit';
        editButton.classList.add('category-edit');

        editButton.setAttribute('aria-label', `Edit ${category} category`)

        removeButton.classList.add('category-remove');

        categoryName.textContent = category;
        removeButton.textContent = 'REMOVE';

        removeButton.type = 'button';

        removeButton.addEventListener('click', function(){

            if(categories.length === 1){
                alert('You must keep at least one categoyr!');
                return;
            }
            const usageCount = records.filter(record => record.category.toLowerCase() === category.toLowerCase()).length;
            const isConfirm = confirm(
                `Are you sure you want to remove "${category}"?\n\n` + 
                `${usageCount} transaction(s) currently use this category.\n\n` + 
                `Existing transactions will not be deleted.`
            );

            if(!isConfirm){
                return;
            }
            categories = categories.filter(function(item){
                return item !== category;
            });

            localStorage.setItem('categories', JSON.stringify(categories));

            renderCategories();
        });

        // listItem.append(categoryName, removeButton);
        // categoryList.appendChild(listItem);

        const actions = document.createElement('div');
        actions.classList.add('category-actions');

        actions.append(editButton, removeButton);

        listItem.append(categoryName, actions);
        categoryList.appendChild(listItem);

        editButton.addEventListener('click', function (){
            const input = document.createElement('input');

            input.type = 'text';
            input.value = category;
            input.classList.add('category-edit-input');
            input.setAttribute('aria-label', `Rename ${category}`);


            const saveButton = document.createElement('button');

            saveButton.type = 'button';
            saveButton.textContent = 'Save';
            saveButton.classList.add('record-utton', 'record-button-save'); // i made this inorder to reuse the existing css


            const cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.textContent = 'Cancel';
            cancelButton.classList.add('record-button', 'record-button-cancel');

            categoryName.replaceWith(input);

            actions.replaceChildren(saveButton, cancelButton);

            input.focus();

            saveButton.addEventListener('click', function(){
                const newName = input.value.trim();



                if(!validateCategory(newName)){
                    alert('Use only letters, spaces and hyphens!');
                    input.focus();
                    return;
                }

                const alreadyExists = categories.some(function(item){
                    return (item.toLowerCase() === newName.toLowerCase() && item.toLowerCase() !== category.toLowerCase());

                });

                if (alreadyExists){
                    alert('this category already exists');
                    input.focus();
                    return;
                }

                categories = categories.map(function(item){
                    return item === category ? newName : item;

                });

                const timeStamp = new Date().toISOString();

                records.forEach(function(record){
                    if(record.category.toLowerCase() === category.toLowerCase()){
                        record.category = newName;
                        record.updatedAt = timeStamp;
                    }
                });

                localStorage.setItem('categories', JSON.stringify(categories));

                savedRecords(records);


                renderCategories();
                searchRecords();
                updateTopCategory();

            });

            cancelButton.addEventListener('click', function(){
                renderCategories();
            });
        });       

        const option = document.createElement('option')
        option.value = category;
        option.textContent = category;

        recordCategorySelect.appendChild(option);
    });
}

addCategorButton.addEventListener('click', function(){
    const newCategory = categoryInput.value.trim();

    if (!validateCategory(newCategory)){
        alert("Use only letters, spaces and hyphens.")
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

const baseCurrency = document.getElementById('base-currency');
const usdExchangeRate = document.getElementById('exchange-rate-1');
const eurExchangeRate = document.getElementById('exchange-rate-2');
const saveCurrencyButton = document.getElementById('save-currency-settings');



let currencySettings = JSON.parse(localStorage.getItem('currencySettings')) || {
    baseCurrency: 'RWF',
    usdToRwf: 1,
    eurToRwf:1
};

baseCurrency.value = currencySettings.baseCurrency;
usdExchangeRate.value = currencySettings.usdToRwf === 1 ? '' : currencySettings.usdToRwf;
eurExchangeRate.value = currencySettings.eurToRwf === 1 ? '': currencySettings.eurToRwf;


saveCurrencyButton.addEventListener('click', function(){
    const selectedCurrency = baseCurrency.value;
    const usdRate = Number(usdExchangeRate.value);
    const eurRate = Number(eurExchangeRate.value);


    if(!selectedCurrency){
        alert('Please choose a base Currency.');
        return;
    }

    if (usdExchangeRate.value.trim() === '' || !Number.isFinite(usdRate)|| usdRate <= 0)
    {
        alert('please enter a valid USD exchange rate');
        return;
    }

    if(eurExchangeRate.value.trim() === '' || !Number.isFinite(eurRate)|| eurRate <= 0){
        alert('please enter a valid EUR exchange rate');
        return;
    }

    currencySettings = {
        baseCurrency: selectedCurrency, usdToRwf: usdRate, eurToRwf:eurRate};

    localStorage.setItem('currencySettings', JSON.stringify(currencySettings));

    updateTotalSpending();
    updateSpendingCap();
    updateWeeklyChart();
    alert('currency settings saved successfully');
    
});


function formatCurrency(amountInRwf){
    const currency = currencySettings.baseCurrency;

    let convertedAmount = amountInRwf;

    if(currency === 'USD'){
        convertedAmount = amountInRwf / currencySettings.usdToRwf;
    }
    else if(currency === 'EUR' ){
        convertedAmount = amountInRwf / currencySettings.eurToRwf;
    }

    return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currency
    }).format(convertedAmount);
}