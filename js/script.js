"use strict";

document.addEventListener("DOMContentLoaded", event => {
    const todoList = document.querySelector(".todo_list");
    const addButton = document.querySelector(".todo_button");
    const addForm = document.querySelector(".todo_add_form");
    const backList = document.querySelector(".todo_add_back>span");

    todoList.addEventListener("click", changeList);
    addButton.addEventListener("click", toggleAddModal);
    backList.addEventListener("click", toggleAddModal);

    addForm.addEventListener("submit", event => addTask(event) );
    addForm.addEventListener("submit", () => showTasks(todoList));
    todoList.addEventListener("click", event => changeLSChecked(event));

    showTasks(todoList);
});

// Добавление и выполнение задач
// Добавить задание, добавляет в localStorage
function addTask(event) {
    event.preventDefault();

    // Получает введенное значение из добавления задания
    const inputTask = document.querySelector(".todo_add_text").value;
    // Устанавливает время (Пример => 09:06)
    const time = getZeroTime(new Date().getHours()) + ":" + getZeroTime(new Date().getMinutes());
    // Получает максимальое id и увеличивает его
    const position = (getId()) + 1;
    // Устанавливает значение в localStorage
    localStorage.setItem(position, JSON.stringify({id: position, task: inputTask, time:time, checked: false}));
}
// Показывает задачи на главной страницы
function showTasks(list) {
    // Сброс списка
    list.innerHTML = "";
    // Выводит задачи на главную страницу, задачи отсортированны по id
    for(let key of getArrayTasks()) {
        list.innerHTML += `
        <li class="todo_item item-${key.id}">
            <label class="todo_labels">
                <input
                    type="checkbox"
                    class="todo_checkboxes"
                    name="todo_checkboxes"
                />
                <span class="todo_fakebox ${key.checked ? "todo_border todo_opacity" : ""}"></span>
                <span class="todo_text ${key.checked ? "todo_line_through color_grey" : ""}">${key.task}</span>
            </label>
            <div class="todo_time ${key.checked ? "color_grey" : ""}">
                <span>${key.time}</span>
            </div>
        </li>
        `;
    }
}

// Получает максимальное id из localStorage
function getId(arrayIds = []) {
    if(localStorage.length > 0) {
        for(let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }
            arrayIds.push(JSON.parse(localStorage[key]).id);
        }
        return Math.max.apply(null, arrayIds);
    }
    return 0;
}

// Изменить параметр checked в localStorage
function changeLSChecked(event) {
    if(event.target && event.target.matches("input.todo_checkboxes")) {
        const id = event.target.parentElement.parentElement.classList.item(1).split("-")[1];
        for(let key of getArrayTasks()) {
            if(key.id === (+id)) {
                const toggleChecked = getTaskByIdFromStorage(key.id).checked ? false : true;
                localStorage.setItem(key.id, JSON.stringify({id: key.id, task: key.task, time: key.time, checked: toggleChecked}))
            }
        }
    }
}
// Получить задание по id в localStorage
function getTaskByIdFromStorage(id) {
    for(let key in localStorage) {
        key = JSON.parse(localStorage[key]);
        if(key.id == id) {
            return key;
        }
    }
}
// Добавляет объекты в массив из localStorage, парсит JSON
function getArrayTasks(newArr = []) {
    for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        newArr.push(JSON.parse(localStorage[key]));
    }
    return newArr.sort((a, b) => a.id - b.id);
}
// Получить id в массиве заданий
function getTaskByIdFromArray(event) {
    if(event.target && event.target.matches("input.todo_checkboxes")) {
        return event.target.parentElement.parentElement.classList.item(1).split("-")[1];
    }
}

// Визуализация
// Добавление и удаление классов при нажатии, на input или label
function changeList(event) {
    if(event.target && event.target.matches("input.todo_checkboxes")) {
        const label = event.target.parentElement;
        toggleClass(label.lastElementChild, "todo_line_through");
        toggleClass(label.lastElementChild, "color_grey");
        toggleClass(label.nextElementSibling, "color_grey");
    }
}
// Включение или отключение модального окна "добавления задач"
function toggleAddModal(event) {
    event.preventDefault();
    toggleClass(document.querySelector(".todo_add_modal"), "todo_add_turn");
}
// Добавление и удаление класса
function toggleClass(element, enemyClass) {
    if(element.classList.contains(enemyClass)) {
        element.classList.remove(enemyClass);
    } else {
        element.classList.add(enemyClass);
    }
}
// Добавление нуля если меньше 1 числа
function getZeroTime(number) {
    if(("" + number).length < 2) {
        return `0${number}`;
    }
    return number;
}