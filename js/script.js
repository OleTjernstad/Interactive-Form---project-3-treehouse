
const jobRole = document.querySelector("#title");

const shirtDesigns = document.querySelector("#design");
const shirtColor = document.querySelector("#color");

const activities = document.querySelector("#activities");
const activitiesCost = document.querySelector("#activities-cost");
let totalCost = 0;

const payment = document.querySelector("#payment");

const registrationForm = document.querySelector("form");

const jobRoleEvaluation = (event) => {
  if (event.target.value === "other") {
    jobRole.nextElementSibling.style.display = "block";
  } else {
    jobRole.nextElementSibling.style.display = "none";
  }
}; 

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
}

const activitiesEvaluation = (event) => {
    if (event.target.type == 'checkbox') {
        if (event.target.checked) {
            totalCost += parseInt(event.target.dataset.cost);
        } else {
            totalCost -= parseInt(event.target.dataset.cost);
        }

        activitiesCost.textContent = `Total: $${totalCost}`;
    }
};

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

}

const paymentEvaluation = (event) => {
  switch (event.target.value) {
    case "credit-card":
        paymentMethodsActivation("credit-card");
      break;
    case "paypal":
        paymentMethodsActivation("paypal");
      break;
    case "bitcoin":
      paymentMethodsActivation("bitcoin");
      break;
    default:
      break;
  }
}

const formSubmit = (event) => {
    let valid = true;
    
    valid = validateNameField(event.target.querySelector("#name"));
    valid = validateEmailField(event.target.querySelector("#email")) && valid ? true : false;
    valid = validateActivities(event.target.querySelectorAll(".activity")) && valid ? true : false;

    console.log('valid', valid);

    if (!valid) {
      event.preventDefault();
    }
}

jobRole.addEventListener("change", jobRoleEvaluation)

shirtDesigns.addEventListener("change", shirtDesignsEvaluation);

activities.addEventListener("change", activitiesEvaluation);

payment.addEventListener("change", paymentEvaluation);

registrationForm.addEventListener("submit", formSubmit);

const init = () => {
    jobRole.nextElementSibling.style.display = "none";

    shirtColor.disabled;

    for (let child of payment.parentElement.parentElement.children) {
  
        if (child.id == "bitcoin" || child.id == "paypal") {
        child.style.display = "none";
        } 
    }

}
init();
