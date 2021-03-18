
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

const _displayNotValid = (element) => {
    element.classList.add("not-valid");
    element.classList.remove("valid");
    element.lastElementChild.style.display = "block"; 
}
const _removeNotValid = (element) => {
    element.classList.remove("not-valid");
    element.classList.add("valid");
    element.lastElementChild.style.display = "none"; 
}

const validateNameField = (element) => {
    if (_isNotEmpty(element.value)) {
        _removeNotValid(element.parentElement);
        return true;
    }
    _displayNotValid(element.parentElement);
    return false;
};

const validateEmailField = (element) => {
    if (_isValidEmail(element.value)) {
        _removeNotValid(element.parentElement);
        return true;
    }
    _displayNotValid(element.parentElement);
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
        _displayNotValid(elements[0].parentElement.parentElement.parentElement);
        return false;
    } 
    _removeNotValid(elements[0].parentElement.parentElement.parentElement);
    return true;
};
const _showOrHideErrorForPayment = (element, valid) => {
    if (valid) {
        _removeNotValid(element.parentElement);
    } else {
        _displayNotValid(element.parentElement);
    }
    return valid;
}
const validateCVV = (CVV) => {
    return _showOrHideErrorForPayment(
        CVV, _isValidNumber(CVV.value, 3)
    );
}
const validateZip = (zipCode) => {
    return _showOrHideErrorForPayment(
          zipCode, _isValidNumber(zipCode.value, 5)
        );
}
const validateCardNum = (cardNum) => {
    return _showOrHideErrorForPayment(
          cardNum, _isValidNumber(cardNum.value, "13,16")
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