// Initialize task arrays for pending and completed tasks
let tasks = [];
let completedTasks = [];

tasks.push(
  { text: "Assignment-1" },
  { text: "Assignment-2" },
  { text: "Assignment-3" }
);

const addTask = () => {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();

  if (taskText) {
    tasks.push({ text: taskText });
    taskInput.value = "";
    updateTaskCounts();
    filterTasks(currentFilter);
  }
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskCounts();
  filterTasks(currentFilter);
};

const deleteCompletedTask = (index) => {
  completedTasks.splice(index, 1);
  updateTaskCounts();
  filterTasks(currentFilter);
};

const completeTask = (index) => {
  const completedTask = tasks.splice(index, 1)[0];
  completedTasks.push(completedTask);
  updateTaskCounts();
  filterTasks(currentFilter);
};

const editTask = (index, isCompleted) => {
  const newTaskText = prompt(
    "Edit your task:",
    isCompleted ? completedTasks[index].text : tasks[index].text
  );

  if (newTaskText) {
    if (isCompleted) {
      completedTasks[index].text = newTaskText;
    } else {
      tasks[index].text = newTaskText;
    }
    filterTasks(currentFilter);
  }
};

let currentFilter = "all";
const filterTasks = (filter) => {
  currentFilter = filter;
  renderTasks(filter);
};

const updateTaskCounts = () => {
  document.getElementById("all-count").innerText =
    tasks.length + completedTasks.length;
  document.getElementById("pending-count").innerText = tasks.length;
  document.getElementById("completed-count").innerText = completedTasks.length;
};

const renderTasks = (filter = "all") => {
  const taskListElement = document.getElementById("task-list");
  taskListElement.innerHTML = "";

  let taskList = [];
  if (filter === "all") {
    taskList = [
      ...tasks,
      ...completedTasks.map((task) => ({ ...task, completed: true })),
    ];
  } else if (filter === "pending") {
    taskList = tasks;
  } else if (filter === "completed") {
    taskList = completedTasks.map((task) => ({ ...task, completed: true }));
  }

  taskList.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.completed ? "completed" : "";

    taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                ${
                  !task.completed
                    ? `<button class="complete-btn" onclick="completeTask(${index})">Complete</button>`
                    : '<span class="completed-label">Completed</span>'
                }
                <button class="edit-btn" onclick="editTask(${index}, ${
      task.completed
    })">Edit</button>
                <button onclick="${
                  task.completed
                    ? `deleteCompletedTask(${index})`
                    : `deleteTask(${index})`
                }">Delete</button>
            </div>
        `;

    taskListElement.appendChild(taskItem);
  });
};

updateTaskCounts();
filterTasks(currentFilter);
