
const _isNotEmpty = (string) => {
    const regex = /\w+/;
    return regex.test(string);
};

const _isValidEmail = (email) => {
    const regex = /^[^@]+@[^@]+\.[a-z]+$/i;
    return regex.test(email);
};

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
    console.log(selectedItems);

    if(selectedItems.length < 1) {
        console.log('No event selected')
        return false;

    } 
    return true;
};