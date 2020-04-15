let storage = [];

function addItem() {
  let item = document.getElementById("todoInput").value;

  let text = document.createTextNode(item);
  let newText = document.createElement("li");
  let dltButton = document.createElement("button");
  let edtButton = document.createElement("button");
  let submitButton = document.createElement('button')

  dltButton.innerText = "Delete";
  dltButton.addEventListener("click", function () {
    removeItem();
  });

  edtButton.innerText = "Edit";
  edtButton.setAttribute = ('id','editbtn')
  edtButton.addEventListener("click", function () {
    newItem();
  });

  submitButton.innerText = 'Submit Edit'
  submitButton.addEventListener('click',function(){
    sbmtEdt();
  })

  newText.appendChild(text);
  newText.appendChild(dltButton);
  newText.appendChild(edtButton);
  newText.appendChild(submitButton);
  if (item === "") {
    alert("Cant be Blank");
  } else {
    document.getElementById("item-list").appendChild(newText);
  }
  storage.push(item);
  console.log(storage);
  
  let increments = document.getElementById('item-list')

  let li = increments.getElementsByTagName('li')

  for (i=0;i<li.length;i++) {
    li[i].setAttribute('id',i+1)
  }
}








function clrItem() {
  let clr = document.getElementById("");

  clr.innerHTML = "";
}

function removeItem() {
  let rmvItem = document.getElementById("item-list");

  rmvItem.parentNode.removeChild(rmvItem);
}

function newItem() {
  

    document.getElementById('item-list').contentEditable = 'true'

}

function sbmtEdt() {
  

  document.getElementById('item-list').contentEditable = 'false'

}




