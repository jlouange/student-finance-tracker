let records = loadRecords();
let counter = records.length > 0
    ? Math.max(...records.map(record => record.id)) + 1
    : 1;