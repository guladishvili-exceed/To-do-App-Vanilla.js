let taskHolder = document.getElementById("task-holder");
const taskInput = document.getElementById("input-task");
let checkAllButton = document.getElementById('checkAll')
const deleteChecked = document.getElementById('deleteChecked')
let paginationBlock = document.getElementById("pagination");
let pageCount = 1;
let currentPage = 1;
taskInput.addEventListener("keyup", (event) => {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("addBtn").click();
	}
});


const setPageCount = () => {
	const items = [...taskHolder.children];
	pageCount = Math.ceil(items.length / 5);

};
setPageCount();
const renderPagination = () => {

	paginationBlock.innerHTML = "";
	for (let i = 1; i <= pageCount; i++) {
		let pageBtn = document.createElement("button");
		pageBtn.id = "pageBtn";
		pageBtn.addEventListener("click", () => {
			currentPage = i;
			paginationDisplay();
		});

		pageBtn.innerText = i;

		paginationBlock.append(pageBtn);
	}
};

const paginationDisplay = () => {
	const items = [...taskHolder.children];
	const start = (currentPage - 1) * 5;
	const end = start + 5;
	items.forEach((item, index) => {
		if (index >= start && index < end) {
			item.style.display = "block";
		} else {
			item.style.display = "none";

		}
	});
};

const getAll = () => {
	axios
		.get("http://localhost:3000/")
		.then((res) => {
			displayData(res.data);
			handleCheckAllButtonInnerText()
			setPageCount();
			renderPagination();
			paginationDisplay();
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
			checked: false,
		})
		.then((res) => {
			displayData([res.data]);
		})
		.catch((err) => {
			console.log("err", err);
		});
};

const updateData = (id) => {
	let todo = document.getElementById(id)
	let getCheck = todo.querySelector('.checkBox')
	let getEdit = todo.querySelector('.editInput')
	axios
		.put(`http://localhost:3000/edit/${id}`, {

			todo: getEdit.value,
			checked: getCheck.checked
		})
		.then((res) => {
			console.log("res", res);
		})
		.catch((err) => {
			console.log("err", err);
		});
};

const updateSingleCheckBox = (id) => {
	let todo = document.getElementById(id)
	let getCheck = todo.querySelector('.checkBox')
	axios
		.put(`http://localhost:3000/edit/${id}`, {
			checked: getCheck.checked
		})
		.then((res) => {
			console.log("res", res);
		})
		.catch((err) => {
			console.log("err", err);
		});
};


const updateAllCheckboxRequest = () => {
	axios
		.put(`http://localhost:3000/checkEdit/`, {
			checked: isAllCheckboxesChecked()
		}).then((res) => {
			console.log("res", res);
	})
		.catch((err) => {
			console.log("err", err);
		});
}

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


const checkDelete = () => {
	axios
		.delete('http://localhost:3000/deleteAllChecked')
		.then((res) => {
			console.log("res", res);
		})
		.catch((err) => {
			console.log("err", err);
		});
};


const displayData = (todo) => {
	console.log('--------todo', todo);
	todo.forEach((todo) => {
		let listItem = document.createElement("li");
		listItem.id = todo._id;

		let label = document.createElement("label");
		label.innerText = todo.todo;

		let editInput = document.createElement("input");
		editInput.setAttribute("type", "text");
		editInput.setAttribute("class", "editInput");
		editInput.id = 'editInput'

		let checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		checkBox.setAttribute('class', 'checkBox')
		checkBox.checked = todo.checked;
		checkBox.addEventListener('click', () => {
			handleChangeCheckbox(todo._id);
		});

		let deleteButton = document.createElement("button");
		deleteButton.innerText = "Delete";
		deleteButton.id = 'delete'
		deleteButton.addEventListener("click", () => {
			deleteElement(todo._id);
			deleteData(todo._id);
		});


		let editButton = document.createElement("button");
		editButton.innerText = "Edit";
		editButton.id = 'edit'
		editButton.addEventListener("click", () => {
			editTask(todo._id)
		});

		let submitButton = document.createElement("button");
		submitButton.innerText = "Submit";
		submitButton.id = 'Submit';
		submitButton.addEventListener('click', () => {
			submitChange(todo._id)
			updateData(todo._id)
		})


		let cancelButton = document.createElement("button");
		cancelButton.innerText = "Cancel";
		cancelButton.id = 'cancel';
		cancelButton.addEventListener('click', () => {
			cancelChange(todo._id)
		})

		let liButtonDiv = document.createElement('div')
		liButtonDiv.setAttribute('class', 'liButton')
		liButtonDiv.appendChild(deleteButton)
		liButtonDiv.append(editButton)

		let buttonsDiv = document.createElement('div')
		buttonsDiv.setAttribute('class', 'anotherLiButtons');
		buttonsDiv.style.display = 'none'
		buttonsDiv.appendChild(submitButton)
		buttonsDiv.appendChild(cancelButton)

		taskHolder.appendChild(listItem);
		listItem.appendChild(checkBox);
		listItem.appendChild(label);
		listItem.appendChild(editInput);
		listItem.appendChild(liButtonDiv);
		listItem.appendChild(buttonsDiv);
	});
};

const editTask = (elementID) => {

	let listItem = document.getElementById(elementID);
	let getAnotherDiv = listItem.querySelector('.liButton')
	let getDiv = listItem.querySelector('.anotherLiButtons')
	let getEdit = listItem.querySelector("input[type='text']");
	let getLabel = listItem.querySelector("label");
	let containsClass = listItem.classList.contains("editMode");
	if (containsClass) {
		getLabel.innerText = getEdit.value;
		getAnotherDiv.style.display = 'block'
		getDiv.style.display = 'none'

	} else {
		getEdit.value = getLabel.innerText
		getAnotherDiv.style.display = 'none'
		getDiv.style.display = 'block'


	}
	listItem.classList.toggle("editMode");

};


const submitChange = (todoID) => {
	let todo = document.getElementById(todoID);
	let getAnotherDiv = todo.querySelector('.liButton')
	getAnotherDiv.style.display = 'block'
	let getDiv = todo.querySelector('.anotherLiButtons')
	getDiv.style.display = 'none'
	let getEdit = todo.querySelector("input[type='text']");
	let getLabel = todo.querySelector("label");
	let containsClass = todo.classList.contains("editMode")

	if (containsClass) {

		getLabel.innerText = getEdit.value;
		todo.classList.toggle("editMode");
	} else {
		alert('Turn on edit input field to submit it !')

	}
}

const cancelChange = (todoID) => {
	let todo = document.getElementById(todoID)
	let getAnotherDiv = todo.querySelector('.liButton')
	getAnotherDiv.style.display = 'block'
	let getDiv = todo.querySelector('.anotherLiButtons')
	getDiv.style.display = 'none'
	let getLabel = todo.querySelector("label");
	let containsClass = todo.classList.contains("editMode");
	if (containsClass) {
		getLabel.value = getLabel.innerText
		todo.classList.toggle("editMode");
	}
}

const deleteElement = (elementID) => {
	let element = document.getElementById(elementID);
	element.parentNode.removeChild(element);
	setPageCount();
	renderPagination();
	paginationDisplay();
};


const handleCheckAllButtonInnerText = () => {
	let getAllCheckBoxesOnPage = document.querySelectorAll('.checkBox')
	let convertCheckboxesOnPageIntoArray = Array.from(getAllCheckBoxesOnPage)

	if (isAllCheckboxesChecked() && convertCheckboxesOnPageIntoArray.length !== 0 ) {
		checkAllButton.innerText = 'Uncheck All'
	} else {
		checkAllButton.innerText = 'Check All'
	}
}

const isAllCheckboxesChecked = () => {
	let checkBoxArray = Array.from(document.querySelectorAll('.checkBox'))
	return checkBoxArray.every(item => item.checked);
}

const handleChangeCheckbox = (id) => {
	updateSingleCheckBox(id);
	
		if (isAllCheckboxesChecked()) {
			checkAllButton.innerText = 'Uncheck All'
		} else {
			checkAllButton.innerText = 'Check All'
		}
}

checkAllButton.addEventListener('click', () => checkAll());
const checkAll = () => {

	let checkBoxEvery = isAllCheckboxesChecked();
	console.log(checkBoxEvery)
	let getCheckBoxArray = document.querySelectorAll('.checkBox')
	let convertCheckBoxListToArray = Array.from(getCheckBoxArray)
	if (checkBoxEvery !== false) {
		convertCheckBoxListToArray.forEach(item => {
			checkAllButton.innerText = 'Check All'
			item.checked = false;
		})
		updateAllCheckboxRequest()

	}else {
		convertCheckBoxListToArray.forEach(item => {
			checkAllButton.innerText = 'Uncheck All'
			item.checked = true;
		})
		updateAllCheckboxRequest()
	}
}


deleteChecked.addEventListener('click', () => removeChecked())
const removeChecked = () => {
	let CheckBoxArray = document.querySelectorAll('.checkBox')
	let convertCheckBoxListToArray = Array.from(CheckBoxArray)
	checkAllButton.innerText = 'Check All'
		convertCheckBoxListToArray.forEach(items => {
			if (items.checked) {
				items.parentNode.parentNode.removeChild(items.parentNode);
			}
		})
	checkDelete();
	setPageCount();
	renderPagination();
	paginationDisplay();
}

let addButton = document.getElementById("addBtn");
addButton.addEventListener('click', () => {

	if (taskInput.value === '') {
		alert('Enter something!')
	} else {
		sendData()
	}
	setPageCount();
	renderPagination();
	paginationDisplay();
	taskInput.value = ''
})




