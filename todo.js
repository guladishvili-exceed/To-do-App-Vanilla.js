

let storage=[]



function userInput() {

    let item = document.getElementById('todoInput').value

    let text = document.createTextNode(item)

    let dltBtn = document.createElement('button')

    let edittBtn = document.createElement('button')

    edittBtn.setAttribute('id','editb')

    edittBtn.innerHTML = 'Edit'

    dltBtn.innerHTML = 'Remove'

    let dltBtnRm = dltBtn.addEventListener('click',function(){
        removeEl()
    });
    

    let editL1 = edittBtn.addEventListener('click',function(){
        editLi()
    });
    
    let checkbox = document.createElement('input')

    checkbox.setAttribute('type','checkbox')

    let newItem = document.createElement('li')

    newItem.setAttribute('id','itemtomanipulate')

    newItem.appendChild(text)

    newItem.appendChild(checkbox)

    newItem.appendChild(edittBtn)

    newItem.appendChild(dltBtn)

    if (item === '') {
        alert('Cant be blank!');
    } else (
        document.getElementById('item-list').appendChild(newItem)
        
    )

    storage.push(newItem)
    console.log(storage)
}

    



function userClr() {

    let clrL = document.getElementById('item-list')

    clrL.innerHTML = ''


}



function removeEl() {

    let removeItem = document.getElementById('itemtomanipulate');

    removeItem.parentNode.removeChild(removeItem);
    
}



    
function editLi() {
   
    let inputText = document.getElementById('todoInput')

    let target = document.getElementsByTagName('li')

    let items=storage;

    let btn=document.getElementById('editb')

    
    items.indexOf[target] = inputText.innerText 



    
    
    
}






