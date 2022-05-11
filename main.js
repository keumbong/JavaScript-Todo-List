let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList =[];
let filterList = []
let mode = 'all';

addButton.addEventListener("mousedown", addTask);
taskInput.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    addTask(event);
  }
})

for(let i = 1; i < tabs.length; i++){
  tabs[i].addEventListener("click", function(event) {
    filter(event);
  })
}

function addTask(){
  let userInput = taskInput.value
  let task = {
    id: randomIDGenerate(),
    taskContent: userInput,
    isComplete: false
  }
  taskList.push(task);
  taskInput.value = '';

  render();
}

function render(){
  let resultHTML = '';
  let list = []

  if(mode == "all"){
    list = taskList;
  }else if(mode == "not-done" || mode == "done"){
    list = filterList;
  }
 
  for(let i = 0; i < list.length; i++){
    if(list[i].isComplete == true){
      resultHTML += `<div class="task task-done" id="${list[i].id}">
    <span>${list[i].taskContent}</span>
    <div class="button-area">
        <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-rotate-left"></i></button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash-can"></i></button>
    </div>
</div>`
    }else{
    resultHTML += `<div class="task" id="${list[i].id}">
    <span>${list[i].taskContent}</span>
    <div class="button-area">
        <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash-can"></i></button>
    </div>
</div>`
  }
}

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id === id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id === id){
      taskList.splice(i, 1);
    }
  }
  filter();
}

function filter(e){
  if (e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }
  
  filterList = [];
  if (mode === "not-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}