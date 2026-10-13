function updateTotalRecords() {
  const totalRecordsElement = document.getElementById('total-records');
  const recordCount = records.length;
  totalRecordsElement.textContent = recordCount;
}

function updateTotalSpending(){
    const totalSpending = document.getElementById('total-spending');
    const total = records.reduce((sum, record) => sum + Number(record.amount), 0);

    totalSpending.textContent = `RWF ${total}`;
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