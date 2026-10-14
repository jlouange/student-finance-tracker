function updateTotalRecords() {
  const totalRecordsElement = document.getElementById('total-records');
  const recordCount = records.length;
  totalRecordsElement.textContent = recordCount;
}

function updateTotalSpending(){
    const totalSpending = document.getElementById('total-spending');
    const total = records.reduce((sum, record) => sum + Number(record.amount), 0);

    totalSpending.textContent = formatCurrency(total);
}

function updateTopCategory() {
  const topCategoryElement = document.getElementById('top-category');
  const categoryTotals = {};
  
  records.forEach(record => {
    const category = record.category;
    const amount = Number(record.amount) || 0;
    
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    
    categoryTotals[category] += amount;
  });
  
  let topCategory = '-';
  let highestAmount = -1;
  
  for (const category in categoryTotals) {
    if (categoryTotals[category] > highestAmount) {
      highestAmount = categoryTotals[category];
      topCategory = category;
    }
  }
  
  topCategoryElement.textContent = topCategory;
}

function updateWeeklyChart(){
  const chart = document.getElementById('weekly-chart');
  chart.innerHTML = '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dailyTotals = [];


  for (let i = 6; i >= 0; i--){
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    const dateKey = [
      day.getFullYear(),
      String(day.getMonth() + 1).padStart(2, '0'),
      String(day.getDate()).padStart(2, '0')
    ].join('-');

    const total = records.reduce((sum, record) => {
      if(record.date === dateKey){
        return sum + Number(record.amount || 0);
      }
      return sum;
    }, 0);

    dailyTotals.push({
      date: dateKey,
      label: day.toLocaleDateString('en', {
        month: 'short',
        day: 'numeric'
      }),
      total: total
    });

  }

  const maxTotal = Math.max(...dailyTotals.map(day => day.total), 1);


  dailyTotals.forEach(day => {
    const barGroup = document.createElement('div');
    barGroup.className = 'chart-bar-group';


    const amount = document.createElement('span');
    amount.className = 'chart-amount';
    amount.textContent = formatCurrency(day.total);

    const bar = document.createElement('div');
    bar.className = 'chart-bar';


    bar.style.height = `${(day.total / maxTotal) * 100}%`;
    bar.setAttribute('role', 'img');
    bar.setAttribute(
      'aria-label',
      `${day.label}: ${formatCurrency(day.total)}`
    );


    const label = document.createElement('span');

    label.className = 'chart-label';
    label.textContent = day.label;

    barGroup.append(amount, bar,label);
    chart.appendChild(barGroup);

  });

}