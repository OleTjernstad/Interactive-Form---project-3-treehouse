
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
    if (_isNotEmpty(element.value)) {
        _removeNotValid(element.parentElement, "#name-hint");
        return true;
    }
    _displayNotValid(element.parentElement, "#name-hint");
    return false;
};

const validateEmailField = (element) => {

    if (_isNotEmpty(element.value)) {
        _removeNotValid(element.parentElement, "#email-hint-provided");
    } else {
        _displayNotValid(element.parentElement, "#email-hint-provided");
        return false;
    }
    if (_isValidEmail(element.value)) {
        _removeNotValid(element.parentElement, "#email-hint");
        return true;
    }
    _displayNotValid(element.parentElement, "#email-hint");
    return false;
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
const _showOrHideErrorForPayment = (element, valid, hintSelector) => {
    if (valid) {
        _removeNotValid(element.parentElement, hintSelector);
    } else {
        _displayNotValid(element.parentElement, hintSelector);
    }
    return valid;
}
const validateCVV = (CVV) => {
    return _showOrHideErrorForPayment(
      CVV,
      _isValidNumber(CVV.value, 3),
      "#cvv-hint"
    );
}
const validateZip = (zipCode) => {
    return _showOrHideErrorForPayment(
      zipCode,
      _isValidNumber(zipCode.value, 5),
      "#zip-hint"
    );
}
const validateCardNum = (cardNum) => {
    return _showOrHideErrorForPayment(
      cardNum,
      _isValidNumber(cardNum.value, "13,16"),
      "#cc-hint"
    );
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