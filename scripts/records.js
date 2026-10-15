function higlightMatches(element, text, regex){
  if (!regex || !regex.source || regex.source === '(?:)'){
    element.textContent = text;
    return;
  }

  const safeRegex = new RegExp(regex.source, regex.flags.replace('g', '').replace('y', '') + 'g');
  

  let lastIndex = 0;

  let match;

  while ((match = safeRegex.exec(text)) !== null){
    if (match[0].length === 0) {
      safeRegex.lastIndex++;
      continue;
    }

    element.appendChild(
      document.createTextNode(text.slice(lastIndex, match.index))
    );
    
    const mark = document.createElement('mark');
    mark.textContent = match[0];
    element.appendChild(mark);

    lastIndex = match.index + match[0].length;
    
  }

  element.appendChild(document.createTextNode(text.slice(lastIndex)))
}

function renderRecords(recordsToRender, regex = null) {
  const tableBody = document.getElementById('records-table-body');
  

  tableBody.innerHTML = '';
  

  recordsToRender.forEach(record => {

    const row = document.createElement('tr');

    const descriptionCell = document.createElement('td');

    // descriptionCell.textContent = record.description;

    higlightMatches(descriptionCell, record.description, regex);
    
    const amountCell = document.createElement('td');


    amountCell.textContent = record.amount;
    
    const categoryCell = document.createElement('td');
    categoryCell.textContent = record.category;


    
    const dateCell = document.createElement('td');
    dateCell.textContent = record.date;

    const actionsCell = document.createElement('td');
    actionsCell.classList.add('record-actions');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('record-button', 'record-button-delete')
    deleteButton.textContent = 'Delete';

    deleteButton.dataset.id = record.id; 

    const editButton = document.createElement('button');
    editButton.classList.add('record-button', 'record-button-edit')
    editButton.textContent = 'Edit';
    editButton.type = 'button';
    editButton.dataset.id = record.id;



    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    

    row.appendChild(descriptionCell);
    row.appendChild(amountCell);
    row.appendChild(categoryCell);
    row.appendChild(dateCell);
    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

