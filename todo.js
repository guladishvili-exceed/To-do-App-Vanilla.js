let taskInput = document.getElementById("new-task");
let addButton = document.getElementsByTagName("button")[0];
addButton.setAttribute('id','add');
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let clickCount = 0;
let listItem;
let label;
let editButton;
let deleteButton;
let editInput;
let pageUL;
let items;
let checkBox;
let pageCount= 1;
let currentCount = 1;
let createNewTaskElement = function (taskString) {
  listItem = document.createElement("li");
  checkBox = document.createElement("input");
  label = document.createElement("label");
  editButton = document.createElement("button");
  deleteButton = document.createElement("button");
  editInput = document.createElement("input");
  label.innerText = taskString;
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};
let addTask = function () {
  listItem = createNewTaskElement(taskInput.value);
  document.getElementById("incomplete-tasks").appendChild(listItem);
  console.log(clickCount)
  pageNumber();
  
  bindTaskEvents(listItem,editButton);
};
let getInput = document.getElementById('new-task');
getInput.addEventListener('keyup',function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add").click();
   }
});

let pageNumber = function() {
  pageUL = document.getElementById('incomplete-tasks')
  items = pageUL.querySelectorAll('li')
  items.forEach((e, i) => {
    e.setAttribute("class",Math.ceil(items.length / 10));
  });
  console.log(items)
  for (let i = 0; i < items.length; i++) {
    if (items.length % 5 === 0 ){
      items[i].style.display = 'none'
    }

  }
  if (items.length % 5 === 0) {
    let pageButton = document.createElement('button')
    pageButton.setAttribute('id','pageButton')
    pageCount = Math.ceil(items.length / 5)
    pageButton.innerText = pageCount;
    pageButton.addEventListener('click',function(){                                      
      for (let i = 0; i < items.length; i++){
        if(items[i].className === pageButton.innerText){
          items[i].style.display = 'block'
        }
      };
    })
    pageUL.appendChild(pageButton)
  }
}



let editTask = function () {
  listItem = this.parentNode;
  editInput = listItem.querySelector("input[type=text]");
  label = listItem.querySelector("label");
  containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
};
let deleteTask = function () {
  listItem = this.parentNode;
  ul = listItem.parentNode;
  ul.removeChild(listItem);
};
addButton.onclick = addTask;


let bindTaskEvents = function (taskListItem) {
  editButton = taskListItem.querySelector("button.edit");
  deleteButton = taskListItem.querySelector("button.delete");
  listItem = taskListItem.querySelector('label');
  addButton = taskListItem.querySelector('button.add')
  listItem.ondblclick = editTask;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i]);
}

