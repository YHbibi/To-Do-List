// Model
class Task {
  constructor(description, done = false) {
    this.description = description;
    this.done = done;
  }
}

class TaskList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  toggleTaskDone(task) {
    task.done = !task.done;
  }

  getTasks() {
    return this.tasks;
  }
}

// View
class TaskListView {
  constructor(element, taskList, statusElement) {
    this.element = element;
    this.taskList = taskList;
    this.statusElement = statusElement;
  }

  render() {
    this.element.innerHTML = '';
    this.taskList.getTasks().forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.description;
      if (task.done) {
        li.classList.add('done');
      }
      li.addEventListener('click', () => {
        this.taskList.toggleTaskDone(task);
        this.render();
      });
      const button = document.createElement('button');
      button.textContent = 'Delete';
      button.addEventListener('click', () => {
        this.taskList.removeTask(task);
        this.render();
      });
      li.appendChild(button);
      this.element.appendChild(li);
    });

    // Show status message
    if (this.taskList.getTasks().length === 0) {
      this.statusElement.textContent = 'There are no tasks yet !';
    } else {
      this.statusElement.textContent = '';
    }
  }
}

// Controller
class TaskListController {
  constructor(formElement, taskList, taskListView) {
    this.formElement = formElement;
    this.taskList = taskList;
    this.taskListView = taskListView;
    this.formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputElement = document.getElementById('newTaskInput');
      const description = inputElement.value.trim();
      const isTaskExists = this.taskList.getTasks().some(task => task.description === description);

      if (description) {
        if (!isTaskExists) {
          const task = new Task(description);
          this.taskList.addTask(task);
          inputElement.value = '';
          this.taskListView.render();
        } else {
          alert('This task is already on the list !');
        }
      } else {
        alert('You cannot have an empty task description !');
      }
    });
  }

  start() {
    this.taskListView.render();
  }
}

// Initialize the app
const taskList = new TaskList();
const taskListView = new TaskListView(document.getElementById('taskList'), taskList, document.getElementById('status'));
const taskListController = new TaskListController(document.querySelector('form'), taskList, taskListView);
taskListController.start();
