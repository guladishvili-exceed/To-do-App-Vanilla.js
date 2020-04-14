let storage = [];

function userInput() {
  let item = document.getElementById("todoInput").value;
  let text = document.createTextNode(item);
  let dltBtn = document.createElement("button");
  let edittBtn = document.createElement("button");

  let newItem = document.createElement("li");
  let checkbox = document.createElement("input");
  let editInput = document.createElement("input");

  editInput.setAttribute("type", "text");
  editInput.setAttribute("id", "editInput");
  newItem.setAttribute("id", "itemtomanipulate");
  checkbox.setAttribute("type", "checkbox");
  edittBtn.innerHTML = "Edit";
  dltBtn.innerHTML = "Remove";

  let dltBtnRm = dltBtn.addEventListener("click", function () {
    removeEl();
  });

  let editL1 = edittBtn.addEventListener("click", function () {
    editLI();
  });

  
  newItem.appendChild(text);
  newItem.appendChild(checkbox);
  newItem.appendChild(edittBtn);
  newItem.appendChild(dltBtn);
  newItem.appendChild(editInput);

  if (item === "") {
    alert("Cant be blank!");
  } else document.getElementById("item-list").appendChild(newItem);

  storage.push(item);
  console.log(storage);
}

function editLI() {
  let getinPUT = document.getElementById("editInput");

  let changeInput = document.getElementById("toDoInput").value;

  changeInput.innerText = getinPUT.value;
}

function userClr() {
  let clrL = document.getElementById("item-list");

  clrL.innerHTML = "";
}

function removeEl() {
  let removeItem = document.getElementById("itemtomanipulate");

  removeItem.parentNode.removeChild(removeItem);
}
