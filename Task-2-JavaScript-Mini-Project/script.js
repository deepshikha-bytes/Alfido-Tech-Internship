const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const categoryInput = document.querySelector("#category-input");
const priorityInput = document.querySelector("#priority-input");
const dateInput = document.querySelector("#date-input");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");

const totalTasks = document.querySelector("#total-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const pendingTasks = document.querySelector("#pending-tasks");

const searchInput = document.querySelector("#search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.querySelector("#clear-completed");
const clearAllBtn = document.querySelector("#clear-all");

const progressFill = document.querySelector("#progress-fill");
const progressPercent = document.querySelector("#progress-percent");

let tasks = JSON.parse(localStorage.getItem("advancedTasks")) || [];
let currentFilter = "all";
let searchValue = "";

function saveTasks() {
  localStorage.setItem("advancedTasks", JSON.stringify(tasks));
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  pendingTasks.textContent = pending;

  progressFill.style.width = `${percent}%`;
  progressPercent.textContent = `${percent}%`;
}

function getFilteredTasks() {
  return tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    const matchesFilter =
      currentFilter === "all" ||
      (currentFilter === "completed" && task.completed) ||
      (currentFilter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });
}

function getPriorityClass(priority) {
  if (priority === "High") return "priority-high";
  if (priority === "Medium") return "priority-medium";
  return "priority-low";
}

function formatDate(date) {
  if (!date) return "No date";
  const selectedDate = new Date(date);
  return selectedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  if (tasks.length === 0) {
    emptyMessage.textContent = "No tasks added yet. Add your first task!";
    emptyMessage.classList.remove("hidden");
  } else if (filteredTasks.length === 0) {
    emptyMessage.textContent = "No matching tasks found.";
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""} />

        <div class="task-text">
          <h4>${task.text}</h4>

          <div class="task-meta">
            <span class="badge category-badge">${task.category}</span>
            <span class="badge ${getPriorityClass(task.priority)}">
              ${task.priority}
            </span>
            <span class="badge date-badge">${formatDate(task.date)}</span>
          </div>
        </div>
      </div>

      <div class="task-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    editBtn.addEventListener("click", () => {
      const updatedTask = prompt("Edit your task:", task.text);

      if (updatedTask !== null && updatedTask.trim() !== "") {
        task.text = updatedTask.trim();
        saveTasks();
        renderTasks();
      }
    });

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });

  updateStats();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task first.");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    category: categoryInput.value,
    priority: priorityInput.value,
    date: dateInput.value,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  dateInput.value = "";
  categoryInput.value = "Study";
  priorityInput.value = "Low";
  taskInput.focus();
});

searchInput.addEventListener("input", () => {
  searchValue = searchInput.value;
  renderTasks();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

clearAllBtn.addEventListener("click", () => {
  const confirmDelete = confirm("Are you sure you want to delete all tasks?");

  if (confirmDelete) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

renderTasks();