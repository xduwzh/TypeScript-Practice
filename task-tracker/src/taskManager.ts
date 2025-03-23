import { Task } from "./task.js";

export class TaskManager {
  private tasks: Task[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    this.saveToLocalStorage();
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveToLocalStorage();
  }

  toggleTask(id: number): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveToLocalStorage();
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem("tasks");
    if (data) {
      this.tasks = JSON.parse(data);
    }
  }
}
