const spendingLimitInput = document.getElementById('spending-limit');
const saveSpendingCapButton = document.getElementById('save-spending-cap');
const capAmount = document.getElementById('cap-amount');
const capMessage = document.getElementById('cap-message');

let spendingCap = Number(localStorage.getItem('spendningCap')) || 0;

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
});