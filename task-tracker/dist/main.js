import { TaskManager } from "./taskManager.js";
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const manager = new TaskManager();
function renderTasks() {
    taskList.innerHTML = "";
    const tasks = manager.getTasks();
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.title;
        li.className = task.completed ? "completed" : "";
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = task.completed ? "Undo" : "Done";
        toggleBtn.onclick = () => {
            manager.toggleTask(task.id);
            renderTasks();
        };
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            manager.deleteTask(task.id);
            renderTasks();
        };
        li.appendChild(toggleBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
renderTasks();
addBtn.addEventListener("click", () => {
    const title = taskInput.value.trim();
    if (title) {
        // TODO: 使用 TaskManager 添加任务
        // manager.????
        manager.addTask(title);
        taskInput.value = "";
        renderTasks();
    }
});
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const title = taskInput.value.trim();
        if (title) {
            manager.addTask(title);
            taskInput.value = "";
            renderTasks();
        }
    }
});
