/**
 * Select elements to interact with
 */
const basicInfo = document.querySelector(".basic-info");

const shirtDesigns = document.querySelector("#design");
const shirtColor = document.querySelector("#color");

const activities = document.querySelector("#activities");
const allActivitiesCheckboxes = activities.querySelectorAll("input");
const activitiesCost = document.querySelector("#activities-cost");
let totalCost = 0;

const payment = document.querySelector("#payment");

const registrationForm = document.querySelector("form");

/**
 * Prevent the user to select events with the same day and time
 *
 * @param {HTMLElement} element
 */
const eventsSameTime = (element) => {
    if (element.checked) {
        for (let activity of allActivitiesCheckboxes) {
            if (
                activity.dataset.dayAndTime === element.dataset.dayAndTime &&
                activity.name != element.name
            ) {
                activity.parentElement.classList.add("deactivatedActivity");
                activity.disabled = true;
            }
        }
    } else {
        for (let activity of allActivitiesCheckboxes) {
            if (
                activity.dataset.dayAndTime === element.dataset.dayAndTime &&
                activity.name != element.name
            ) {
                activity.parentElement.classList.remove("deactivatedActivity");
                activity.disabled = false;
            }
        }
    }
};

/**
 * Evaluate the job role field and hide or display the other field
 *
 * @param {event} event
 */
const jobRoleEvaluation = (event) => {
    if (event.target.value === "other") {
        basicInfo.querySelector("#other-job-role").style.display = "block";
    } else {
        basicInfo.querySelector("#other-job-role").style.display = "none";
    }
};

/**
 * Evaluate the shirt designs and display the relevant colors
 *
 * @param {event} event
 */
const shirtDesignsEvaluation = (event) => {
    if (event.target.value === "js puns" || event.target.value === "heart js") {
        shirtColor.disabled = false;
        for (let item of shirtColor.children) {
            item.selected = false;
            if (item.dataset.theme == event.target.value) {
                item.hidden = false;
            } else {
                item.hidden = true;
            }
        }
    } else {
        shirtColor.disabled = true;
    }
};

/**
 * Evaluate the activities for day and time and add or retract the event cost
 *
 * @param {event} event
 */
const activitiesEvaluation = (event) => {
    if (event.target.type == "checkbox") {
        eventsSameTime(event.target);
        if (event.target.checked) {
            totalCost += parseInt(event.target.dataset.cost);
        } else {
            totalCost -= parseInt(event.target.dataset.cost);
        }

        activitiesCost.textContent = `Total: $${totalCost}`;
    }
};

/**
 * Activate the selected payment options and deactivate the others
 *
 * @param {string} optionToShow
 */
const paymentMethodsActivation = (optionToShow) => {
    for (let child of payment.parentElement.parentElement.children) {
        if (child.className != "payment-method-box") {
            if (child.id == optionToShow) {
                child.style.display = "block";
            } else {
                child.style.display = "none";
            }
        }
    }
};

/**
 * Run validation on submit and prevent default if form not valid
 *
 * @param {event} event
 *
 * @returns
 */
const formSubmit = (event) => {
    let isNameValid = validateNameField(basicInfo.querySelector("#name"));
    let isEmailValid = validateEmailField(basicInfo.querySelector("#email"));
    let isActivitiesValid = validateActivities(allActivitiesCheckboxes);
    let isPaymentValid = validatePayment(
        event.target.querySelector("#cc-num"),
        event.target.querySelector("#zip"),
        event.target.querySelector("#cvv"),
        payment.value
    );

    if (isNameValid && isEmailValid && isActivitiesValid && isPaymentValid) {
        return;
    }
    event.preventDefault();
};

/**
 * React on focus and blur on activities and add or remove class
 *
 * @param {event} event
 */
const focusStateActivities = (event) => {
    if (event.type === "focus") {
        event.target.parentElement.classList.add("focus");
    } else if (event.type === "blur") {
        event.target.parentElement.classList.remove("focus");
    }
};

/**
 * run correct function when live validating
 *
 * @param {HTMLElement} element
 */
const liveValidation = (element) => {
    if (element.id) {
        switch (element.id) {
            case "name":
                validateNameField(element);
                break;
            case "email":
                validateEmailField(element);
                break;
            case "cvv":
                validateCVV(element);
                break;
            case "zip":
                validateZip(element);
                break;
            case "cc-num":
                validateCardNum(element);
                break;
        }
    } else {
        if (element.type == "checkbox") {
            validateActivities(allActivitiesCheckboxes);
        }
    }
};

/**
 * Start the app and add event listeners and make form interactive
 */
const init = () => {
    basicInfo.querySelector("#other-job-role").style.display = "none";

    shirtColor.disabled = true;

    for (let child of payment.parentElement.parentElement.children) {
        if (child.id == "bitcoin" || child.id == "paypal") {
            child.style.display = "none";
        }
    }

    for (let activity of allActivitiesCheckboxes) {
        activity.addEventListener("focus", focusStateActivities);
        activity.addEventListener("blur", focusStateActivities);
    }

    basicInfo.addEventListener("change", jobRoleEvaluation);
    shirtDesigns.addEventListener("change", shirtDesignsEvaluation);
    activities.addEventListener("change", (event) => {
        activitiesEvaluation(event);
        liveValidation(event.target);
    });
    payment.addEventListener("change", (event) =>
        paymentMethodsActivation(event.target.value)
    );

    registrationForm.addEventListener("submit", formSubmit);

    basicInfo.addEventListener("keyup", (event) =>
        liveValidation(event.target)
    );
    document
        .querySelector("#credit-card")
        .addEventListener("keyup", (event) => liveValidation(event.target));
};

init();
