/**
 * Check if string contains a word character
 *
 * @param {string} string string to test
 *
 * @returns boolean
 */
const _isNotEmpty = (string) => {
    const regex = /\w+/;
    return regex.test(string);
};
/**
 * Check if string is valid email
 *
 * @param {string} email email string to test
 *
 * @returns boolean
 */
const _isValidEmail = (email) => {
    const regex = /^[^@]+@[^@]+\.[a-z]+$/i;
    return regex.test(email);
};

/**
 * Check if test string is a valid number of specified length
 *
 * @param {number} number the number to test
 * @param {string} length the regex length string (1 | 1, | 2,3)
 *
 * @returns boolean
 */
const _isValidNumber = (number, length) => {
    const regex = new RegExp(`^\\d{${length}}$`);
    return regex.test(number);
};

/**
 * Show the error message
 *
 * @param {HTMLElement} element the element to add not-valid / valid class to
 * @param {string} hintSelector the identifier of the message block
 */
const _displayNotValid = (element, hintSelector) => {
    element.classList.add("not-valid");
    element.classList.remove("valid");
    element.querySelector(hintSelector).style.display = "block";
};

/**
 * Remove the error message
 *
 * @param {HTMLElement} element the element to add not-valid / valid class to
 * @param {string} hintSelector the identifier of the message block
 */
const _removeNotValid = (element, hintSelector) => {
    element.classList.remove("not-valid");
    element.classList.add("valid");
    element.querySelector(hintSelector).style.display = "none";
};

/**
 * add or remove the error message
 *
 * @param {HTMLElement} element The validated element
 * @param {boolean} valid to add or remove the message
 * @param {string} hintSelector the message selector
 */
const _showOrHideError = (element, valid, hintSelector) => {
    if (valid) {
        _removeNotValid(element.parentElement, hintSelector);
    } else {
        _displayNotValid(element.parentElement, hintSelector);
    }
};

/**
 * Validating the name field and add / remove error message
 *
 * @param {HTMLElement} element the element to validate
 *
 * @returns boolean
 */
const validateNameField = (element) => {
    let valid = true;
    valid = _isNotEmpty(element.value);
    _showOrHideError(element, valid, "#name-hint");

    return valid;
};

/**
 * Validating the email field and add / remove error message
 *
 * @param {HTMLElement} element the element to validate
 *
 * @returns boolean
 */
const validateEmailField = (element) => {
    let valid = true;
    valid = _isNotEmpty(element.value);
    _showOrHideError(element, valid, "#email-hint-provided");

    valid = _isValidEmail(element.value);
    _showOrHideError(element, valid, "#email-hint");

    return valid;
};

/**
 * Validating the activities field and add / remove error message
 *
 * @param {HTMLElement} element the element to validate
 *
 * @returns boolean
 */
const validateActivities = (elements) => {
    let selectedItems = [];
    for (let element of elements) {
        if (element.checked) {
            selectedItems.push(element);
        }
    }

    if (selectedItems.length < 1) {
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

/**
 * Validate the CVV field and add or remove the error message
 *
 * @param {HTMLElement} CVV The CVV element to validate
 *
 * @returns boolean
 */
const validateCVV = (CVV) => {
    let valid = true;
    valid = _isNotEmpty(CVV.value);
    _showOrHideError(CVV, valid, "#cvv-hint-empty");

    valid = _isValidNumber(CVV.value, "1,");
    _showOrHideError(CVV, valid, "#cvv-hint-number-only");

    valid = _isValidNumber(CVV.value, "3");
    _showOrHideError(CVV, valid, "#cvv-hint");

    return valid;
};

/**
 * Validate the zipCode field and add or remove the error message
 *
 * @param {HTMLElement} zipCode The zipCode element to validate
 *
 * @returns boolean
 */
const validateZip = (zipCode) => {
    let valid = true;
    valid = _isNotEmpty(zipCode.value);
    _showOrHideError(zipCode, valid, "#zip-hint-empty");

    valid = _isValidNumber(zipCode.value, "1,");
    _showOrHideError(zipCode, valid, "#zip-hint-number-only");

    valid = _isValidNumber(zipCode.value, "5");
    _showOrHideError(zipCode, valid, "#zip-hint");

    return valid;
};

/**
 * Validate the cardNum field and add or remove the error message
 *
 * @param {HTMLElement} cardNum The cardNum element to validate
 *
 * @returns boolean
 */
const validateCardNum = (cardNum) => {
    let valid = true;
    valid = _isNotEmpty(cardNum.value);
    _showOrHideError(cardNum, valid, "#cc-hint-empty");

    valid = _isValidNumber(cardNum.value, "1,");
    _showOrHideError(cardNum, valid, "#cc-hint-number-only");

    valid = _isValidNumber(cardNum.value, "13,16");
    _showOrHideError(cardNum, valid, "#cc-hint");

    return valid;
};
/**
 * Validate all payment fields on submit if credit-card is selected
 *
 * @param {HTMLElement} cardNum The Credit card field element
 * @param {HTMLElement} zipCode  The zip Code field element
 * @param {HTMLElement} CVV The CVV field element
 * @param {string} selectedPaymentType the selected payment type
 *
 * @returns boolean
 */
const validatePayment = (cardNum, zipCode, CVV, selectedPaymentType) => {
    if (selectedPaymentType === "credit-card") {
        let isCVVValid = validateCVV(CVV);
        let isZipValid = validateZip(zipCode);
        let isCardNumValid = validateCardNum(cardNum);

        return isCVVValid && isZipValid && isCardNumValid;
    }
    return true;
};
