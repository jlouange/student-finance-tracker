function searchRecords() {
    const searchInput = document.getElementById('record-search');
    const caseCheckbox = document.getElementById('case-insensitive');
    const feedback = document.getElementById('search-feedback');
    
    const sortSelect = document.getElementById('sort-records');

    const pattern = searchInput.value;
    const flags = caseCheckbox.checked ? 'i' : '';

    let regex;

    try{
        regex = new RegExp(pattern, flags);

    }catch (error) {
        feedback.textContent = 'Invalid regular expression. Please check your pattern';
        return;
    }

    // const filteredRecords = records.filter(record => {
    //     regex.lastIndex = 0;
    //     return regex.test(record.description);

    // });

    // feedback.textContent = `${filteredRecords.length} matching record(s)`

    // renderRecords(filteredRecords, regex);

    let filteredRecords = records.filter(record => {
        regex.lastIndex = 0;
        return regex.test(record.description);

    });

    const sortOption = sortSelect.value;

    filteredRecords.sort((a,b) => {
        switch (sortOption){

            case 'date-desc':
                return new Date(b.date) - new Date(a.date);

            case 'date-asc':
                return new Date(a.date) - new Date(b.date);

            case 'description-asc':
                return a.description.localeCompare(b.description);
            
            case 'description-desc':
                return b.description.localeCompare(a.description);
            
            case 'amount-desc':
                return Number(b.amount) - Number(a.amount);
            
            case 'amount-asc':
                return Number(a.amount) - Number(b.amount);
            
                default:
                    return 0;

                
        }
    });

    feedback.textContent = `${filteredRecords.length} matching records(s)`;

    renderRecords(filteredRecords, regex);


}

document.getElementById('record-search').addEventListener('input', searchRecords);
document.getElementById('case-insensitive').addEventListener('change', searchRecords);

document.getElementById('sort-records').addEventListener('change', searchRecords)