// Weather Api fetch data
fetchWeatherData();

// Display Digital Clock
showTime();

//Theme
const themeImg = document.querySelectorAll(".main_themeImg");

themeImg.forEach((img) => {
  img.addEventListener("click", () => {
    if(img.getAttribute("theme")){
      document.querySelector('body').classList.add('music_theme')
    }else{
      document.querySelector('body').classList.remove('music_theme')
    }
    app.style.backgroundImage = `url(${img.src})`;
  });
});

// Add todo list
// store all variable
const todoInput = document.querySelector(".todoInput");
const clearBtn = document.querySelector(".clearBtn");
const taskBox = document.querySelector(".taskBox");
const todoBtn = document.querySelector(".todoBtn");

// which one checking define variable here
let editId = "";
let isEditTask = false;

// get all todos from local Storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

// Show Our Todo List
const showTodo = () => {
  let liTag = "";
  if (todos) {
    const revdata = todos.reverse();
    revdata.forEach(({ name }, id) => {
      // html template
      liTag += `<li class="task">
                    <input type="checkbox" id="${id}" class='checkBoxInput'>
                    <p class='todoName'>${name}</p>
                            <div class="settings">
                                <ul class="taskMenu">
                                    <button data-id=${id} data-item=${name} class='edit'><i class="fa-solid fa-pen-to-square"></i>Edit</button>
                                    <button data-id="${id}" class='delete'><i class="fa-solid fa-trash"></i>Delete</button>
                                </ul>
                            </div>
                        </li>`;
    });
  }
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;

  // Delete Item Call Here
  document.querySelectorAll(".edit")?.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      const id = editBtn.dataset.id;
      const item = editBtn.dataset.item;
      editTask(id, item);
    });
  });

  //Delete Item Call here
  document.querySelectorAll(".delete").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const id = deleteBtn.getAttribute("data-id");
      deleteTask(id);
    });
  });
};

showTodo();

// Edit Task FUnction
function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  todoInput.value = textName;
  todoInput.focus();
  todoBtn.innerHTML = isEditTask ? "Update Task" : "Add Task";
}

// Delete Task Function
function deleteTask(deleteId) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

// Delete ALl Function
clearBtn.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

// fire a event when user typing anything
todoBtn.addEventListener("click", (e) => {
  let todo = todoInput.value.trim();
  if (!todo) return alert("Add something");
  if (!isEditTask) {
    todos = !todos ? [] : todos;
    let addTodo = { name: todo, status: "pending" };
    todos.push(addTodo);
  } else {
    todos[editId].name = todo;
    isEditTask = false;
  }
  // When User Submit Form Value is Empty
  todoInput.value = "";
  // Set All Todo In Local Storage
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});
