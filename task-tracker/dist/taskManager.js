export class TaskManager {
    constructor() {
        this.tasks = [];
        this.loadFromLocalStorage();
    }
    addTask(title) {
        const newTask = {
            id: Date.now(),
            title,
            completed: false,
        };
        this.tasks.push(newTask);
        this.saveToLocalStorage();
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveToLocalStorage();
    }
    toggleTask(id) {
        const task = this.tasks.find((task) => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToLocalStorage();
        }
    }
    getTasks() {
        return this.tasks;
    }
    saveToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    loadFromLocalStorage() {
        const data = localStorage.getItem("tasks");
        if (data) {
            this.tasks = JSON.parse(data);
        }
    }
}
