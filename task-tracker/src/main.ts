import { TaskManager } from "./taskManager.js";
import { Task } from "./task.js";

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

const manager = new TaskManager();

function renderTasks(): void {
  taskList.innerHTML = "";

  const tasks = manager.getTasks();

  tasks.forEach((task: Task) => {
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

taskInput.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    const title = taskInput.value.trim();
    if (title) {
      manager.addTask(title);
      taskInput.value = "";
      renderTasks();
    }
  }
});
