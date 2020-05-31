// let paginationBlock = document.getElementById("pagination");
let taskHolder = document.getElementById("task-holder");
const taskInput = document.getElementById("input-task");
// let pageCount = 1;
// let currentPage = 1;
// let deleteCount = 0;

// const setPageCount = () => {
//   const items = [...taskHolder.children];
//   pageCount = Math.ceil(items.length / 5);

// };
// setPageCount();
// const renderPagination = () => {
// 
//   paginationBlock.innerHTML = "";
//   for (let i = 1; i <= pageCount; i++) {
//     let pageBtn = document.createElement("button");
//     pageBtn.id = "pageBtn";
//     pageBtn.addEventListener("click", () => {
//       currentPage = i;
//       paginationDisplay();
//     });

//     pageBtn.innerText = i;

//     paginationBlock.append(pageBtn);
//   }
// };

// const paginationDisplay = () => {
//   const items = [...taskHolder.children];
//   const start = (currentPage - 1) * 5;
//   const end = start + 5;
//   items.forEach((item, index) => {
//     if (index >= start && index < end) {
//       item.style.display = "block";
//     } else {
//       item.style.display = "none";

//     }
//   });
// };

const getAll = () => {
  axios
    .get("http://localhost:3000/")
    .then((res) => {
      console.log("-------Get", res.data);
      displayData(res.data);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

getAll();

const sendData = () => {
  axios
    .post("http://localhost:3000/add", {
      todo: taskInput.value,
    })
    .then((res) => {
      
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const updateData = (id) => {
  axios
    .put(`http://localhost:3000/edit/${id}`, {
      todo: taskInput.value,
    })
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const deleteData = (id) => {
  axios
    .delete(`http://localhost:3000/delete/${id}`)
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const displayData = (todo) => {
  todo.forEach((todo) => {
    let listItem = document.createElement("li");
    listItem.id = todo._id;

    let label = document.createElement("label");
    label.innerText = todo.todo;

    let editInput = document.createElement("input");
    editInput.setAttribute("type", "text");
    editInput.id = 'editInput'

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    let addButton = document.getElementById("addBtn");
    addButton.addEventListener('click', () => {
      sendData();
      getOne(todo._id)
    })
   
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteElement(todo._id);
      deleteData(todo._id);
    });

    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", () => {
      editTask(todo._id);
    });

    let submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.id = "submit";
    submitButton.style.display = "none";
    

    let cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.style.display = "none";

    taskHolder.appendChild(listItem);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    listItem.appendChild(submitButton);
    listItem.appendChild(cancelButton);
  });
};

const editTask = (elementID) => {
  let listItem = this.document.getElementById(elementID);
  let getEdit = listItem.querySelector("input[type=text]");
  let getLabel = listItem.querySelector("label");
  let containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    getLabel.innerText = getEdit.value;
  } else {
    getEdit.value = getLabel.innerText;
  }
  listItem.classList.toggle("editMode");
};


const deleteElement = (elementID) => {
  let element = document.getElementById(elementID);
  element.parentNode.removeChild(element);
};




// let getInput = document.getElementById("new-task");
// getInput.addEventListener("keyup", (event) => {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     document.getElementById("add").click();
//   }
// });

