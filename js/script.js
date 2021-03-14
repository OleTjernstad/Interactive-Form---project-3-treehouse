
const jobRole = document.querySelector("#title");

jobRole.addEventListener("change", (event) => {
    if (event.target.value === 'other') {
        jobRole.nextElementSibling.style.display = 'block';
    } else {
        jobRole.nextElementSibling.style.display = "none";
    }
});


const shirtDesigns = document.querySelector("#design");
const shirtColor = document.querySelector("#color");

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

const activities = document.querySelector("#activities");
const activitiesCost = document.querySelector("#activities-cost");
let totalCost = 0;

activities.addEventListener("change", (event) => {
    console.log(event.target)
    if (event.target.type == 'checkbox') {
        if (event.target.checked) {
            totalCost += parseInt(event.target.dataset.cost);
        } else {
            totalCost -= parseInt(event.target.dataset.cost);
        }

        activitiesCost.textContent = `Total: $${totalCost}`;
    }
});
