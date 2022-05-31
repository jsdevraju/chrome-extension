//Selector
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
let nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloudy");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.querySelector(".locationInput");
const cities = document.querySelectorAll(".city");
const btn = document.querySelector(".submit");
const search = document.querySelector(".search");

//Checking Day
function dayOfTheWeek() {
  switch (new Date().getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }
  return day;
}

//Fetch Data Form Weather Api
async function fetchWeatherData() {
  //Based on ip track user location
  const res = await fetch(
    `https://extreme-ip-lookup.com/json/?key=vu7lGZRX8ppJ0m6Pt9zM`
  );
  const data = await res.json();

  fetch(
    `http://api.weatherapi.com/v1/current.json?key=7fa5846d95c54247b0362925222905&q=${data?.city}`
  )
    .then((res) => res.json())
    .then((data) => {
      temp.innerHTML = data.current.temp_c + "&#176";
      conditionOutput.innerHTML = data.current.condition.text;

      const dat = data.location.localtime;
      const y = parseInt(dat.substr(0, 4));
      const m = parseInt(dat.substr(5, 2));
      const d = parseInt(dat.substr(8, 2));
      const time = dat.substr(11);
      dateOutput.innerHTML = `${dayOfTheWeek()},${d}.${m}.${y}`;
      timeOutput.innerHTML = time;
      nameOutput.innerHTML = data.location.name;

      document.addEventListener("beforeload", () => {
        const iconId = data.current.condition.icon;
        icon.src = `${iconId}`;
      });

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + " kp/h";

      //set default time and day
      let timeOfDay;

      const code = data.current.condition.code;
      // change to night on your city
      if (data.current.is_day) {
        timeOfDay = "day";
      } else {
        timeOfDay = "night";
      }

      if (code == 1000) {
        app.style.backgroundImage = `url(./assets/clear.jpg)`;
        btn.style.background = "#e5ba92";

        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      }
      // some thing cloudy wether
      else if (
        code == 103 ||
        code == 106 ||
        code == 109 ||
        code == 130 ||
        code == 169 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./assets/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      }
      // some thing rainy wether
      else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./assets/rainy.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        }
      }

      //and finnaly ... snow
      else {
        app.style.backgroundImage = `url(./assets/snowy.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }

      app.style.opacity = "1";
    })

    .catch(() => {
      app.style.opacity = "1";
    });
}

fetchWeatherData();

// Display Digital Clock
function showTime() {
  let date = new Date();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  let session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  let time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("displayClock").innerText = time;
  document.getElementById("displayClock").textContent = time;

  setTimeout(showTime, 1000);
}

showTime();

//Theme
const themeImg = document.querySelectorAll(".main_themeImg");

themeImg.forEach((img) => {
  img.addEventListener("click", () => {
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
    revdata.forEach(({name}, id) => {
      // html template
      liTag += `<li class="task">
                    <input type="checkbox" id="${id}" class='checkBoxInput'>
                    <p class='todoName'>${name}</p>
                            <div class="settings">
                                <ul class="taskMenu">
                                    <button data-id="${id}" data-item="${name}" class='edit'><i class="fa-solid fa-pen-to-square"></i>Edit</button>
                                    <button data-id="${id}" class='delete'><i class="fa-solid fa-trash"></i>Delete</button>
                                </ul>
                            </div>
                        </li>`;
    });
  }
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
};

showTodo();

//Add Delete Button Selector
const editBtn = document.querySelectorAll(".edit");
const deleteBtn = document.querySelectorAll(".delete");


// Edit Task FUnction
const editTask = (taskId, textName) => {
  editId = taskId;
  isEditTask = true;
  todoInput.value = textName;
  todoInput.focus();
  todoBtn.innerHTML = isEditTask ? "Update Task" : "Add Task"
};

// Delete Task Function
const deleteTask = (deleteId) => {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
};

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
  if(!todo) return alert('Add something');
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

editBtn?.forEach((btn) =>{
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    const item = btn.getAttribute("data-item");
    editTask(id, item);
  });
})

deleteBtn?.forEach((btn) =>{
  btn.addEventListener('click', () =>{
    const id = btn.getAttribute("data-id");
    deleteTask(id);
  })
})
