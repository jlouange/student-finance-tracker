function validateDescription(description) {
  if (typeof description !== 'string' ){
    return false;
  }


  const descriptionPattern = /^\S(?:.*\S)?$/;
  if(!descriptionPattern.test(description)) {

    return false;
  }

  const consecutiveSpacesRegex = /\s{2,}/;

  if (consecutiveSpacesRegex.test(description)){
    return false;
  }
  
  return true;
}

function validateAmount (amount){
    
    // if (typeof amount !== "number"){
    //     return false;
    // }

    const amountPattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
    if (!amountPattern.test(amount)) {
        return false;
    }

    return true;
}

function validateDate(date) {
    if (typeof(date) !== "string"){
        return false;

    }

    const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

    if (!datePattern.test(date)){
        return false;
    }

    return true;
}


function validateCategory(category) {
  if (typeof category !== 'string' ){
    return false;
  }


  const categoryPattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
  if(!categoryPattern.test(category)) {

    return false;
  }

  const consecutiveSpacesRegex = /\s{2,}/;

  if (consecutiveSpacesRegex.test(category)){
    return false;
  }
  
  return true;
}

function hasDuplicateWords (description) {
    if (typeof(description) !== "string") {
        return false;
    }

    const duplicatePattern = /\b(\w+)\s+\1\b/

    if (!duplicatePattern.test(description)){
        return false;

    }

    return true;
}



