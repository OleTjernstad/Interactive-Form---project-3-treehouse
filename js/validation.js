
const _isNotEmpty = (string) => {
    const regex = /\w+/;
    return regex.test(string);
};

const _isValidEmail = (email) => {
    const regex = /^[^@]+@[^@]+\.[a-z]+$/i;
    return regex.test(email);
};

const _isValidNumber = (number, length) => {
    const regex = new RegExp(`^\\d{${length}}$`);
    return regex.test(number);
}

const _displayNotValid = (element, hintSelector) => {
    element.classList.add("not-valid");
    element.classList.remove("valid");
    element.querySelector(hintSelector).style.display = "block"; 
}
const _removeNotValid = (element, hintSelector) => {
    element.classList.remove("not-valid");
    element.classList.add("valid");
    element.querySelector(hintSelector).style.display = "none"; 
}

const validateNameField = (element) => {
    let valid = true;
    valid = _isNotEmpty(element.value);
    _showOrHideError(element, valid, "#name-hint");
    
   return valid;
};

const validateEmailField = (element) => {
    let valid = true;
    valid = _isNotEmpty(element.value);
    _showOrHideError(element, valid, "#email-hint-provided");

    valid = _isValidEmail(element.value);
    _showOrHideError(element, valid, "#email-hint");
    
    return valid;
};

const validateActivities = (elements) => {
    let selectedItems = [];
    for (let element of elements) {
        if (element.checked) {
            selectedItems.push(element);
        }
    }

    if(selectedItems.length < 1) {
        
        _displayNotValid(
          elements[0].parentElement.parentElement.parentElement,
          "#activities-hint"
        );
        return false;
    } 
    _removeNotValid(
      elements[0].parentElement.parentElement.parentElement,
      "#activities-hint"
    );
    
    return true;
};
const _showOrHideError = (element, valid, hintSelector) => {
    if (valid) {
        _removeNotValid(element.parentElement, hintSelector);
    } else {
        _displayNotValid(element.parentElement, hintSelector);
    }
}
const validateCVV = (CVV) => {
    let valid = true;
    valid = _isNotEmpty(CVV.value);
    _showOrHideError(CVV, valid, "#cvv-hint-empty");

    valid = _isValidNumber(CVV.value, "1,");
    _showOrHideError(CVV, valid, "#cvv-hint-number-only");

    valid = _isValidNumber(CVV.value, "3");
    _showOrHideError(CVV, valid, "#cvv-hint");

    return valid;
}
const validateZip = (zipCode) => {
    let valid = true;
    valid = _isNotEmpty(zipCode.value);
    _showOrHideError(zipCode, valid, "#zip-hint-empty");

    valid = _isValidNumber(zipCode.value, "1,");
    _showOrHideError(zipCode, valid, "#zip-hint-number-only");

    valid = _isValidNumber(zipCode.value, "5");
    _showOrHideError(zipCode, valid, "#zip-hint");

    return valid;
}
const validateCardNum = (cardNum) => {
    let valid = true;
    valid = _isNotEmpty(cardNum.value);
    _showOrHideError(cardNum, valid, "#cc-hint-empty");
    
    valid = _isValidNumber(cardNum.value, "1,");
    _showOrHideError(cardNum, valid, "#cc-hint-number-only");

    valid = _isValidNumber(cardNum.value, "13,16");
    _showOrHideError(cardNum, valid, "#cc-hint");
    
    return valid;
}
const validatePayment = (cardNum, zipCode, CVV, selectedPaymentType) => {
    if (selectedPaymentType === "credit-card") {
        
        let isCVVValid = validateCVV(CVV);
        let isZipValid = validateZip(zipCode);
        let isCardNumValid = validateCardNum(cardNum);

       if (isCVVValid)

        return isCVVValid && isZipValid && isCardNumValid;
    }
    return true;
};