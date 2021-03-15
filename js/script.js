
const jobRole = document.querySelector("#title");

const shirtDesigns = document.querySelector("#design");
const shirtColor = document.querySelector("#color");

const activities = document.querySelector("#activities");
const activitiesCost = document.querySelector("#activities-cost");
let totalCost = 0;

const payment = document.querySelector("#payment");

jobRole.addEventListener("change", (event) => {
    if (event.target.value === 'other') {
        jobRole.nextElementSibling.style.display = 'block';
    } else {
        jobRole.nextElementSibling.style.display = "none";
    }
});

shirtDesigns.addEventListener("change", (event) => {
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
});

activities.addEventListener("change", (event) => {
    if (event.target.type == 'checkbox') {
        if (event.target.checked) {
            totalCost += parseInt(event.target.dataset.cost);
        } else {
            totalCost -= parseInt(event.target.dataset.cost);
        }

        activitiesCost.textContent = `Total: $${totalCost}`;
    }
});

payment.addEventListener("change", (event) => {
   
    switch (event.target.value) {
      case "credit-card":
          for (let child of payment.parentElement.parentElement.children) {
              if (child.className != "payment-method-box") {
                if (child.id == "credit-card") {
                  child.style.display = "block";
                } else {
                  child.style.display = "none";
                }
            }
          }
        break;
      case "paypal":
           for (let child of payment.parentElement.parentElement.children) {
             if (child.className != "payment-method-box") {
               if (child.id == "paypal") {
                 child.style.display = "block";
               } else {
                 child.style.display = "none";
               }
             }
           }
        break;
      case "bitcoin":
           for (let child of payment.parentElement.parentElement.children) {
             if (child.className != "payment-method-box") {
               if (child.id == "bitcoin") {
                 child.style.display = "block";
               } else {
                 child.style.display = "none";
               }
             }
           }
        break; 
      default:
        break;
    }
});

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
