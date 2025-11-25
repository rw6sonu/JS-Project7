let taskList = [];

document.getElementById("addBtn").addEventListener("click", function Form() {

    const title = document.getElementById("taskName").value.trim();
    const detail = document.getElementById("taskDetail").value.trim();
    const category = document.getElementById("taskCategory").value;
    const date = document.getElementById("taskDate").value;


    if (title === "" || detail === "" || category === "" || date === "") {
        alert("⚠️ Please fill all fields before opening dashboard");

        // ❌ Dashboard ko hide rakho
        document.getElementById("taskListSection").style.display = "none";
        return; // stop execution here
    }


    const task = {
        title: title,
        detail: detail,
        category: category,
        date: date,
        completed: false
    };

    taskList.push(task);

    console.log("Task added:", task);
    console.log("All tasks:", taskList);

    document.getElementById("taskName").value = "";
    document.getElementById("taskDetail").value = "";
    document.getElementById("taskCategory").value = "";
    document.getElementById("taskDate").value = "";


    setTimeout(() => {
        document.getElementById("taskListSection").style.display = "block";
        document.getElementById("form").style.left = "20%";
    }, 1000);

    if (taskList.length > 0) {
        document.getElementById("summary").style.display = "block";
        document.getElementById("form").style.left = "20%";
    } else {
        document.getElementById("summary").style.display = "none";
    }


    const taskItems = document.getElementById("taskItems");
    taskItems.innerHTML = "";
    taskList.forEach((t, i) => {
        if (title == "" || detail == "" || category == "" || date == "") {
            return;
        }
        else {
            alert("Please Complete your Task and add the new task also..");


            const li = document.createElement("li");
            li.className = "task-item";


            const contentDiv = document.createElement("div");
            contentDiv.className = "task-content";

            const titleLine = document.createElement("div");
            titleLine.textContent = `${i + 1}.  ${t.title} (${t.category})`;

            const dateLine = document.createElement("div");
            dateLine.className = "task-date";
            dateLine.textContent = `${t.date}`;

            contentDiv.appendChild(titleLine);
            contentDiv.appendChild(dateLine);

            updateSummary();
            const btnContainer = document.createElement("div");
            btnContainer.className = "task-buttons";


            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.className = "complete-btn";
            completeBtn.onclick = () => {
                li.classList.add("completed-task");
                t.completed = true;
                updateSummary();
            };

            let editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "edit-btn";
            editBtn.onclick = () => {
                const newTitle = prompt("Enter new task title:", t.title);
                if (newTitle !== null && newTitle.trim() !== "") {
                    t.title = newTitle.trim();
                    titleLine.textContent = `${i + 1}. ${t.title} (${t.category})`;
                    updateSummary();
                }

            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.onclick = () => {
                taskList.splice(i, 1);
                li.remove();
                updateSummary();
            };
            btnContainer.appendChild(completeBtn);
            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);

            // Add all spans inside LI
            li.appendChild(contentDiv);
            li.appendChild(btnContainer);

            taskItems.appendChild(li);
        }

        function updateSummary() {
            const total = taskList.length;
            let completed = 0;
            let overdue = 0;
            const today = new Date();

            taskList.forEach((task) => {
                const taskDate = new Date(task.date);
                if (task.completed) completed++;
                else if (taskDate < today && !task.completed) overdue++;
            });

            const pending = total - completed - overdue;
            const summary = document.getElementById("summary");
            summary.innerHTML = `
             <h2>Dashboard</h2>
              <div class="dashboard-circles">
        <div><span class="circle-count circle-total">${total}</span><p>All Tasks</p></div>
        <div><span class="circle-count circle-completed">${completed}</span><p>Completed</p></div>
        <div><span class="circle-count circle-pending">${pending}</span><p>Pending</p></div>
        <div> <span class="circle-count circle-overdue">${overdue}</span><p>Overdue</p></div>
         </div>
              `
            summary.style.display = "block";

            if (total > 0) {
                document.getElementById("summary").style.display = "block";
            } else {
                document.getElementById("summary").style.display = "none";
            }

            if (total > 0) {
                document.getElementById("filter").style.display = "block";
            } else {
                document.getElementById("filter").style.display = "none";
            }

        }

        
    });
});
function renderTasks(filter = "all") {
  const filterItems = document.getElementById("filterItems");
  filterItems.innerHTML = "";
  const today = new Date();

  taskList.forEach((t, i) => {
    if (filter === "completed" && !t.completed) return;
    if (filter === "overdue" && (t.completed || new Date(t.date) >= today)) return;
    if (filter === "pending" && (t.completed || new Date(t.date) < today)) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${i + 1}. ${t.title} (${t.category}))<br>
      <small>${t.date}</small><br>
    `;
    filterItems.appendChild(li);
  });
}





















