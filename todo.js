function todoList() {
    let item = document.getElementById('toMakeInput').value
    let text= document.createTextNode(item);
    let newItem = document.createElement('li');
    let checkBox = document.createElement('input')
    let newButtons = document.createElement('button');
    newButtons.setAttribute('type','button');
    newButtons.setAttribute('value','Delete')
    checkBox.setAttribute('type','checkbox');
    newItem.appendChild(newButtons);
    newItem.appendChild(checkBox);
    newItem.appendChild(text);
    document.getElementById('todoList').appendChild(newItem);
}


