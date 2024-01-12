let selection = document.querySelector(".selection");
let selected_text = document.querySelector(".selection p");
let categories = document.querySelector(".categories");
let options = document.querySelectorAll(".categories p");


selection.onclick = function(){
    categories.classList.toggle("active");
}

options.forEach(option => {
    option.onclick = function(){
        selected_text.innerHTML = option.innerHTML;
    categories.classList.toggle("active");

    }
});