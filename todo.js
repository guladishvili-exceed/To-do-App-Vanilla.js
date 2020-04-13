

function todoList() {
	
    let item    = document.getElementById('todoInput').value
	
	let text    = document.createTextNode(item)
	
    let newItem = document.createElement('li')

    newItem.setAttribute('id','itemtomanipulate')
    
    let checkbox = document.createElement('input')

    checkbox.setAttribute('type','checkbox')

    let dltBtn = document.createElement('button');

    dltBtn.innerHTML='Remove'

    dltBtn.addEventListener('click',removeBtn)

    newItem.appendChild(dltBtn)
    
    newItem.appendChild(checkbox)

    newItem.appendChild(text)
    
    
   
    
    if (item === '') {
        alert('Dont leave This Blank!')
    } else { 
        document.getElementById('todoList').appendChild(newItem)
        

    }
}


function removeBtn() {
    let itemToRemove = document.getElementById('itemtomanipulate');
    itemToRemove.parentNode.removeChild(itemToRemove);

}

