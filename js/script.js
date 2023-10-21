"use strict";

document.addEventListener("DOMContentLoaded", event => {
    const todoList = document.querySelector(".todo_list");

    todoList.addEventListener("click", event => {
        if(event.target && event.target.matches("input.todo_checkboxes")) {
            // addColorAndLineThrough(event.target.parentElement.lastElementChild);
            // event.target.parentElement.nextElementSibling.classList.toggle("color_grey");
            addGreyColor(event.target.parentElement.lastElementChild, "todo_line_through");
            addGreyColor(event.target.parentElement.lastElementChild, "color_grey");
            addGreyColor(event.target.parentElement.nextElementSibling, "color_grey");
        }
    });

});

function addColorAndLineThrough(element) {
    if(element.classList.contains("todo_line_through") && element.classList.contains("color_grey")) {
        element.classList.remove("todo_line_through");
        element.classList.remove("color_grey");
    } else {
        element.classList.add("todo_line_through");
        element.classList.add("color_grey");
    }
}

function addGreyColor(element, enemyClass) {
    if(element.classList.contains(enemyClass)) {
        element.classList.remove(enemyClass);
    } else {
        element.classList.add(enemyClass);
    }
}