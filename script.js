const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
let tasks = [];

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim() === "") return;
    const newTask = {
        id: Date.now(),
        text: input.value.trim()
    };
    tasks.push(newTask);
    renderTasks();
    saveTasks();
    input.value = "";
});

ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const id = e.target.parentElement.dataset.id;
        tasks = tasks.filter(task => task.id !== parseInt(id));
        renderTasks();
        saveTasks();
    }
});

function renderTasks() {
    ul.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "&times";
        deleteBtn.classList.add("delete");
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}