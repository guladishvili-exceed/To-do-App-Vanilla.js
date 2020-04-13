

function todoList() {

	let item    = document.getElementById('todoInput').value
	
    let text    = document.createTextNode(item)
    

    let newItem = document.createElement('li')

    newItem.setAttribute('id','itemtomanipulate')
    
    let checkBox=document.createElement('input')

    let edtButton = document.createElement('button')

    edtButton.innerHTML = 'Edit'

    edtButton.addEventListener('click',editItem)

    let clrBtn=document.createElement('button')

    clrBtn.innerHTML = 'Remove'

    clrBtn.setAttribute('id','itemToRemove')

    clrBtn.addEventListener('click',removeItem)

    checkBox.setAttribute('type','checkbox')

    newItem.appendChild(edtButton)

    newItem.appendChild(clrBtn)

    newItem.appendChild(checkBox)
	
	newItem.appendChild(text)
	
	document.getElementById('todoList').appendChild(newItem) } 


   

    function removeItem() {
        let itemToRemove = document.getElementById('itemtomanipulate');
        itemToRemove.parentNode.removeChild(itemToRemove);
    }


    function editItem() {
        let itemToEdit = document.getElementById('itemtomanipulate').value;



        itemToEdit.innerHTML = edditedItem;

        

        
    };



    function blankError() {

        let itemLength = document.getElementById('itemtomanipulate').value;

        if(itemLength.value.lenght == 0) {

            alert('you cant leave this blank')

            return false;



        }

        
    }