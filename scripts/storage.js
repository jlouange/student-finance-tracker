function savedRecords(records) {
    localStorage.setItem('studentFinanceRecords', JSON.stringify(records));

}

function loadRecords(){
    const savedRecords = localStorage.getItem('studentFinanceRecords');

    if (!savedRecords){
        return [];
    }

    return JSON.parse(savedRecords);
}