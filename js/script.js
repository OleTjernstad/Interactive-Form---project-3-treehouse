
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
