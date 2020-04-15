
let storage = []

function addItem() {
  let item = document.getElementById("todoInput").value;

  let text = document.createTextNode(item);
  let newText = document.createElement("li");
  newText.setAttribute("id",'innerLi');
  let dltButton = document.createElement("button");
  let edtButton = document.createElement('button')


  dltButton.innerText = "Delete";
  dltButton.addEventListener("click", function () {
    removeItem();
  });

  edtButton.innerText = 'Edit'
  edtButton.addEventListener('click',function() {
    newItem();
  })

  
  newText.appendChild(text);
  newText.appendChild(dltButton);
  newText.appendChild(edtButton)
  if (item === "") {
    alert("Cant be Blank");
  } else {
    document.getElementById("item-list").appendChild(newText);
  }
  storage.push(item)
  console.log(storage)
}






function clrItem() {
  let clr = document.getElementById("item-list");

  clr.innerHTML = "";
}

function removeItem() {
  let rmvItem = document.getElementById("innerLi");

  rmvItem.parentNode.removeChild(rmvItem);
}


function newItem() {

  document.getElementById('innerLi')  .contentEditable = true;


}

