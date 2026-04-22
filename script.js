let taskCounter = 0;
//localStorage.removeItem("completeTask");
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

const loadTasks = () => {
    let savedTasks = JSON.parse(localStorage.getItem("savedtasks")) || [];

    savedTasks.forEach((task, index) => {
        let taskName = index + 1 + ". " + task;
        addTask(task, index);
    });
};


const addTask = (task, taskIndex) => {

    let taskList = document.getElementById("taskList");
    let completeTask = JSON.parse(localStorage.getItem("completeTask")) || [];

    if (task !== "") {
        let listItem = document.createElement("div");
        let buttonbox = document.createElement("div");
        let Delbutton = document.createElement("button");
        let Editbutton = document.createElement("button");
        let Donebtn = document.createElement("button");



        if (completeTask.includes(task)) {
            listItem.className = "listItem completed";
            Donebtn.textContent = "❌";
        } else {
            listItem.className = "listItem";
            Donebtn.textContent = "✅";
        }



        buttonbox.className = "buttonbox";


        Delbutton.textContent = "🗑️";
        Editbutton.textContent = "✏️";

        listItem.innerHTML = `<label class="task-label">${taskIndex + 1}. ${task}</label>`;
        Delbutton.addEventListener("click", () => {
            deleteTasks(task);
            taskList.removeChild(listItem);
            taskList.innerHTML = "";
            loadTasks();
            

        });

        Donebtn.addEventListener("click", () => {
            if (Donebtn.textContent === "✅") {
                let completeTask = JSON.parse(localStorage.getItem("completeTask")) || [];
                completeTask.push(task);
                localStorage.setItem("completeTask", JSON.stringify(completeTask));
                Donebtn.textContent = "❌";
                listItem.classList.toggle("completed");
                console.log(JSON.stringify(completeTask));
            } else {
                let completeTask = JSON.parse(localStorage.getItem("completeTask")) || [];
                completeTask = completeTask.filter(t => t.toLowerCase() !== task.toLowerCase());
                localStorage.setItem("completeTask", JSON.stringify(completeTask));
                console.log(JSON.stringify(completeTask));
                Donebtn.textContent = "✅";
                listItem.classList.toggle("completed");
            }
        });

        Editbutton.addEventListener("click", () => {
            let newTask = prompt("Edit your task:", task);
            if (newTask !== null && newTask.trim() !== "") {
                let tasks = JSON.parse(localStorage.getItem("savedtasks")) || [];
                let taskIndex = tasks.findIndex(t => t.toLowerCase() === task.toLowerCase());
                if (taskIndex !== -1) {
                    tasks[taskIndex] = newTask;
                    localStorage.setItem("savedtasks", JSON.stringify(tasks));
                    listItem.querySelector(".task-label").textContent = taskIndex + 1 + ". " + newTask;
                    console.log(JSON.stringify(tasks));
                    if (Donebtn.textContent === "❌") {
                        let completeTask = JSON.parse(localStorage.getItem("completeTask")) || [];
                        let completeIndex = completeTask.findIndex(t => t.toLowerCase() === task.toLowerCase());
                        if (completeIndex !== -1) {
                            completeTask[completeIndex] = newTask;
                            localStorage.setItem("completeTask", JSON.stringify(completeTask));
                        }
                    }

                }
            }
        });


        buttonbox.appendChild(Donebtn);
        buttonbox.appendChild(Delbutton);
        buttonbox.appendChild(Editbutton);

        listItem.appendChild(buttonbox);
        taskList.appendChild(listItem);



    }

}

document.getElementById("addTaskButton").addEventListener("click", () => {
    let taskInput = document.getElementById("taskInput");
    if (taskInput.value !== "") {
        let tasks = JSON.parse(localStorage.getItem("savedtasks")) || [];
        let taskIndex = tasks.length;
        let taskName = taskInput.value;
        tasks.push(taskName);

        localStorage.setItem("savedtasks", JSON.stringify(tasks));
        addTask(taskName, taskIndex);
        taskInput.value = "";
        console.log(JSON.stringify(tasks));
    }

});


const deleteTasks = (searchTerm) => {
    let tasks = JSON.parse(localStorage.getItem("savedtasks"));
    let filteredTasks = tasks.filter(task => task.toLowerCase() !== searchTerm.toLowerCase());
    localStorage.setItem("savedtasks", JSON.stringify(filteredTasks));
    console.log(JSON.stringify(filteredTasks));

    let completeTask = JSON.parse(localStorage.getItem("completeTask")) || [];
    completeTask = completeTask.filter(t => t.toLowerCase() !== searchTerm.toLowerCase());
    localStorage.setItem("completeTask", JSON.stringify(completeTask));
    console.log(JSON.stringify(completeTask));
}





// document.getElementById("taskInput").addEventListener("input", (e) => {
//     let searchTerm = e.target.value;
//     console.log(searchTerm);
//     let tasks = JSON.parse(localStorage.getItem("savedtasks"));
//     let filteredTasks = tasks.filter(task => task.toLowerCase().includes(searchTerm.toLowerCase()));
//     let taskList = document.getElementById("taskList");
//     taskList.innerHTML = "";

//     filteredTasks.forEach(task => {
//         addTask(task);
//     });

// });



document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        if (e.target.id === "taskInput") {
            document.getElementById("addTaskButton").click();

        }
    }
});
