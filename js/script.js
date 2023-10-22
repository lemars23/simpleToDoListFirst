"use strict";

document.addEventListener("DOMContentLoaded", event => {
    const todoList = document.querySelector(".todo_list");
    todoList.addEventListener("click", event => {
        if(event.target && event.target.matches("input.todo_checkboxes")) {
            const label = event.target.parentElement;
            toggleClass(label.lastElementChild, "todo_line_through");
            toggleClass(label.lastElementChild, "color_grey");
            toggleClass(label.nextElementSibling, "color_grey");
            toggleClass(label.children[1], "todo_border");
        }
    });
});

function toggleClass(element, enemyClass) {
    if(element.classList.contains(enemyClass)) {
        element.classList.remove(enemyClass);
    } else {
        element.classList.add(enemyClass);
    }
}