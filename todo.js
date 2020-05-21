

let taskInput = document.getElementById("new-task");
let paginationBlock = document.getElementById("pagination");
let addButton = document.getElementsByTagName("button")[0];
addButton.setAttribute("id", "add");
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let paginationHolder = document.getElementById("pagination");
let listItem;
let label;
let editButton;
let deleteButton;
let editInput;
let checkBox;
let pageCount = 1;
let currentPage = 1;
let deleteCount = 0;
let storeData = [{}]
const setPageCount = () => {
  const items = [...incompleteTaskHolder.children];
  pageCount = Math.ceil(items.length / 5);

};
setPageCount();
const renderPagination = () => {
  const items = [...incompleteTaskHolder.children]
  paginationBlock.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    let pageBtn = document.createElement("button");
    pageBtn.id = "pageBtn";
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      paginationDisplay();
    });
    
    pageBtn.innerText = i;

    paginationBlock.append(pageBtn);
    
    
  }
};
const paginationLimit = () => {
  
  const items = [...incompleteTaskHolder.children];
  if (items.length % 5 === 0) {
    items.style.display = "none";
  }
};

const paginationDisplay = () => {
  const items = [...incompleteTaskHolder.children];
  const start = (currentPage - 1) * 5;
  const end = start + 5;
  items.forEach((item, index) => {
    if (index >= start && index < end) {
      item.style.display = "block"; 
    } else {
      item.style.display = "none";
      
    }
  });
};

const sendData = () => {
  let getValue = document.getElementById('new-task').value
  axios.post('http://localhost:3000/add',{
  todo : getValue
}).then(res => {
  storeData.push({id : res.data._id})
  console.log('res', res);
}).catch(err => {
  console.log('err',err);
})
console.log(storeData)
}

const generate = (database) => {
  database.forEach(todo = () =>{
    const newlistItem = document.createElement('li')

    newlistItem.textContent = database;

    incompleteTaskHolder.appendChild(newlistItem)

  })


const getAll = () => {
  axios.get('http://localhost:3000/').
  then(res => {
    generate(res.data)
    console.log('res',res)
  }).catch(err => {
    console.log('err',err)
  })
}

getAll();

const deleteData = (id) => {
  axios.delete(`http://localhost:3000/delete/${id}`,{
    id : storeData
  }).then(res => {
    console.log('res',res)
  }).catch(err => {
    console.log('err',err)
  })
};



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
let addTask = function (showData) {
  listItem = createNewTaskElement(taskInput.value);
  document.getElementById("incomplete-tasks").appendChild(listItem);
  bindTaskEvents(listItem, editButton);
  setPageCount();
  renderPagination();
  paginationDisplay();
  sendData();
  
};
let getInput = document.getElementById("new-task");
getInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add").click();
  }
});



let editTask = function () {
  listItem = this.parentNode;
  editInput = listItem.querySelector("input[type=text]");
  label = listItem.querySelector("label");
  containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
    updateData();
  }
  listItem.classList.toggle("editMode");
};

let deleteTask = function () {
  listItem = this.parentNode;
  ul = listItem.parentNode;
  ul.removeChild(listItem);
  setPageCount();
  renderPagination();
  paginationDisplay();
  deleteData();
  
};

addButton.onclick = addTask;

let bindTaskEvents = function (taskListItem) {
  editButton = taskListItem.querySelector("button.edit");
  deleteButton = taskListItem.querySelector("button.delete");
  listItem = taskListItem.querySelector("label");
  addButton = taskListItem.querySelector("button.add");
  listItem.ondblclick = editTask;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i]);
}
