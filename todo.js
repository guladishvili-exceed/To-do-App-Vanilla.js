

let taskInput=document.getElementById("new-task");
let addButton=document.getElementsByTagName("button")[0];
let incompleteTaskHolder=document.getElementById("incomplete-tasks");
let completedTasksHolder=document.getElementById("completed-tasks");
let listItem=document.createElement("li");

let checkBox=document.createElement("input");
let label=document.createElement("label");
let editButton=document.createElement("button");
let deleteButton=document.createElement("button");
let editInput=document.createElement("input");



var createNewTaskElement=function(taskString){



	label.innerText=taskString;

	
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";



	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



let addTask=function(){

	
	listItem=createNewTaskElement(taskInput.value);

	
	if(listItem === ''){
    alert('This field cant be empty')
  } else {
    document.getElementById('incomplete-tasks').appendChild(listItem)
  }
	bindTaskEvents(listItem, taskCompleted);


}


let editTask=function(){



 listItem=this.parentNode

 editInput=listItem.querySelector('input[type=text]');
 label=listItem.querySelector("label");
 containsClass=listItem.classList.contains("editMode");

		if(containsClass){

		
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		
		listItem.classList.toggle("editMode");
}





let deleteTask=function(){
	

		 listItem=this.parentNode;
		 ul=listItem.parentNode;
	
		ul.removeChild(listItem)
}



let taskCompleted=function(){
	
	
	
	listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
		

	listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}





addButton.onclick=addTask;




let bindTaskEvents=function(taskListItem,checkBoxEventHandler){


	 checkBox=taskListItem.querySelector("input[type=checkbox]");
	 editButton=taskListItem.querySelector("button.edit");
	 deleteButton=taskListItem.querySelector("button.delete");


		
			editButton.onclick=editTask;
		
			deleteButton.onclick=deleteTask;
		
			checkBox.onchange=checkBoxEventHandler;
}


	for (let i=0; i<incompleteTaskHolder.children.length;i++){

	
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}




	for (let i=0; i<completedTasksHolder.children.length;i++){

		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}




