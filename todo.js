

let storage=[]



function userInput() {

    let item = document.getElementById('todoInput').value
    let text = document.createTextNode(item)
    let dltBtn = document.createElement('button')
    let edittBtn = document.createElement('button')
    let newItem = document.createElement('li')
    let checkbox = document.createElement('input')

    newItem.setAttribute('id','itemtomanipulate')
    edittBtn.setAttribute('id','editb')
    checkbox.setAttribute('type','checkbox')
    newItem.setAttribute('id','itemtomanipulate')
    edittBtn.innerHTML = 'Edit'
    dltBtn.innerHTML = 'Remove'

    let dltBtnRm = dltBtn.addEventListener('click',function(){
        removeEl()
    });
    

    let editL1 = edittBtn.addEventListener('click',function(){
            
        editLI()
   
        

    });
    

    newItem.appendChild(text)
    newItem.appendChild(checkbox)
    newItem.appendChild(edittBtn)
    newItem.appendChild(dltBtn)

    if (item === '') {
        alert('Cant be blank!');
    } else (
        document.getElementById('item-list').appendChild(newItem)
        
    )

    storage.push(item)
    console.log(storage)
}

    

function editLI() {

}



function userClr() {

    let clrL = document.getElementById('item-list')

    clrL.innerHTML = ''


}



function removeEl() {

    let removeItem = document.getElementById('itemtomanipulate');

    removeItem.parentNode.removeChild(removeItem);
    
}










