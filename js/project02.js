document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const filters = document.querySelectorAll(".filter");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));

    const renderTasks = (filter = "all") => {
        taskList.innerHTML = "";
        const filteredTasks = tasks.filter(task => 
            filter === "all" || (filter === "completed" && task.completed) || (filter === "pending" && !task.completed)
        );

        filteredTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `task ${task.completed ? "completed" : ""}`;
            li.draggable = true;
            li.dataset.index = index;

            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="actions">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <button class="toggle">${task.completed ? "Unmark" : "Mark"}</button>
                </div>
            `;

            taskList.appendChild(li);
        });

        setupDragAndDrop();
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (!text) return;

        tasks.push({ text, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    };

    const setupDragAndDrop = () => {
        const taskElements = document.querySelectorAll(".task");

        taskElements.forEach(task => {
            task.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", e.target.dataset.index);
            });

            task.addEventListener("dragover", (e) => e.preventDefault());

            task.addEventListener("drop", (e) => {
                const draggedIndex = e.dataTransfer.getData("text/plain");
                const targetIndex = e.target.closest(".task").dataset.index;

                [tasks[draggedIndex], tasks[targetIndex]] = [tasks[targetIndex], tasks[draggedIndex]];
                saveTasks();
                renderTasks();
            });
        });
    };

    taskList.addEventListener("click", (e) => {
        const index = e.target.closest(".task").dataset.index;

        if (e.target.classList.contains("edit")) {
            const newText = prompt("Edit task:", tasks[index].text);
            if (newText !== null) tasks[index].text = newText.trim();
        } else if (e.target.classList.contains("delete")) {
            tasks.splice(index, 1);
        } else if (e.target.classList.contains("toggle")) {
            tasks[index].completed = !tasks[index].completed;
        }

        saveTasks();
        renderTasks();
    });

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            filters.forEach(btn => btn.classList.remove("active"));
            filter.classList.add("active");
            renderTasks(filter.dataset.filter);
        });
    });

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => e.key === "Enter" && addTask());

    renderTasks();
});
