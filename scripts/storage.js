function savedRecords(records) {
    localStorage.setItem('studentFinanceRecords', JSON.stringify(records));

}

function loadRecords(){
    const savedRecords = localStorage.getItem('studentFinanceRecords');

    if (!savedRecords){
        return [];
    }

    try{
        const parsedRecords = JSON.parse(savedRecords);

        if(!Array.isArray(parsedRecords)){
            console.error('Saved records must be an array');
            return [];
        }

        return parsedRecords;
    }catch(error){
        console.error('Failed to load saved Records: ', error);
        return [];
    }

}