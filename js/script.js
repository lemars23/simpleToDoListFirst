"use strict";

document.addEventListener("DOMContentLoaded", event => {
    const todoList = document.querySelector(".todo_list");
    const addButton = document.querySelector(".todo_button");
    const addForm = document.querySelector(".todo_add_form");
    const backList = document.querySelector(".todo_add_back>span");
    let newArrayTasks = [];

    todoList.addEventListener("click", changeList);
    todoList.addEventListener("click", event => changeChecked(event, newArrayTasks));
    addButton.addEventListener("click", toggleAddModal);
    backList.addEventListener("click", toggleAddModal);
    addForm.addEventListener("submit", event => addTasks(event, newArrayTasks, todoList));
});


function showArrayTasks(arrayTasks, list) {
    list.innerHTML = "";

    for(let task of arrayTasks) {
        task = JSON.parse(task);

        list.innerHTML += `
        <li class="todo_item item-${task.id}">
            <label class="todo_labels">
                <input
                    type="checkbox"
                    class="todo_checkboxes"
                    name="todo_checkboxes"
                />
                <span class="todo_fakebox"></span>
                <span class="todo_text">${task.task}</span>
            </label>
            <div class="todo_time color_red">
                <span>${task.time}</span>
            </div>
        </li>
        `;
    }
}
function addTasks(event, array, list) {
    event.preventDefault();

    const value = event.target.firstElementChild.value;
    const time = (new Date()).getHours() + ":" + (new Date()).getMinutes();
    let id = Number(array.length) + 1;
    array.push(JSON.stringify({
        "id": id,
        "task": value,
        "time": time,
        "checked": false
    }));

    // console.log(array);
    showArrayTasks(array, list);
}
function changeChecked(event, array) {
    if(event.target && event.target.matches("input.todo_checkboxes")) {
        const id = event.target.parentElement.parentElement.classList.item(1).split("-")[1];

        for(let item of array) {
            item = JSON.parse(item);
            
            if(item.id == id) {
                item.checked = true;
            }
        }
    }
    return array;
}

function changeList(event) {
    if(event.target && event.target.matches("input.todo_checkboxes")) {
        const label = event.target.parentElement;
        toggleClass(label.lastElementChild, "todo_line_through");
        toggleClass(label.lastElementChild, "color_grey");
        toggleClass(label.nextElementSibling, "color_grey");
        toggleClass(label.children[1], "todo_border");
    }
}
function toggleAddModal(event) {
    event.preventDefault();
    toggleClass(document.querySelector(".todo_add_modal"), "todo_add_turn");
}
function toggleClass(element, enemyClass) {
    if(element.classList.contains(enemyClass)) {
        element.classList.remove(enemyClass);
    } else {
        element.classList.add(enemyClass);
    }
}
