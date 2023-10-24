"use strict";

document.addEventListener("DOMContentLoaded", event => {
    const todoList = document.querySelector(".todo_list");
    const addButton = document.querySelector(".todo_button");
    const addForm = document.querySelector(".todo_add_form");
    const backList = document.querySelector(".todo_add_back>span");

    todoList.addEventListener("click", changeList);
    addButton.addEventListener("click", toggleAddModal);
    backList.addEventListener("click", toggleAddModal);
    addForm.addEventListener("submit", addTask);
});

function showTasks(tasks, list) {
    for(let task of tasks) {
        list.innerHTML += task;
    }
}

function getTasks(arr = []) {
    for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        if(key.match(/Task-\d/ig)) {
            arr.push(key);
        }
    }
    return arr.sort();
}

function getLastTask(tasks, arr = []) {
    if(tasks.length > 0) {
        for(let key of tasks) {
            arr.push(key.match(/\d/g).join(""));
        }
    } else {
        return 1;
    }
    
    return (Math.max.apply(null, arr)) + 1;
}

function addTask(event) {
    event.preventDefault();

    const value = event.target.firstElementChild.value;
    const idLastTask = getLastTask(getTasks());
    const newTask = `Task-${idLastTask}`;
    const time = (new Date()).getHours() + ":" + (new Date()).getMinutes();

   localStorage.setItem(newTask, JSON.stringify({task: value, time: time}));

    document.querySelector(".todo_add_modal").classList.remove("todo_add_turn");


}

function toggleAddModal(event) {
    event.preventDefault();
    toggleClass(document.querySelector(".todo_add_modal"), "todo_add_turn");
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

function toggleClass(element, enemyClass) {
    if(element.classList.contains(enemyClass)) {
        element.classList.remove(enemyClass);
    } else {
        element.classList.add(enemyClass);
    }
}
