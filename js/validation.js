
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
    console.log(regex);
    return regex.test(number);
}

const validateNameField = (element) => {
    if (_isNotEmpty(element.value)) {
        return true;
    }
    console.log('empty name');
    return false;
};

const validateEmailField = (element) => {
    if (_isValidEmail(element.value)) {
        return true;
    }
    console.log("Email not valid");
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
        return false;
    } 
    return true;
};
const validatePayment = (cardNum, zipCode, CVV, selectedPaymentType) => {
    console.log(selectedPaymentType);
    if (selectedPaymentType === "credit-card") {
        
        let isCVVValid = _isValidNumber(CVV.value, 3);
        let isZipValid = _isValidNumber(zipCode.value, 5);
        let isCardNumValid = _isValidNumber(cardNum.value, "13,16");

        console.log("card", { isCVVValid, isZipValid, isCardNumValid });

        return isCVVValid && isZipValid && isCardNumValid;
    }
    return true;
};