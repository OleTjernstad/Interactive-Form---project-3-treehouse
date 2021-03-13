
const jobRole = document.querySelector("#title");

jobRole.addEventListener("change", (event) => {
    if (event.target.value === 'other') {
        jobRole.nextElementSibling.style.display = 'block';
    } else {
        jobRole.nextElementSibling.style.display = "none";
    }
//   if (event.target.tagName == "IMG") {
//     search(event.target.parentNode.previousElementSibling.value);
//   } else if (event.target.tagName == "BUTTON") {
//     // if somehow the button element is clicked and not the IMG
//     search(event.target.previousElementSibling.value);
//   }
});
