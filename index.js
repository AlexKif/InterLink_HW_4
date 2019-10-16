let todolist = [];
const todoUrl = 'https://5da211fa76c28f0014bbe2e1.mockapi.io/todos';

const ajaxPost = (url, params, callback) => {
    const request = new XMLHttpRequest();

    request.open('POST', url, false);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function () {
        if (request.readyState === 4 || request.status === 200) {
            callback(request.response);
        }
    };

    request.send(params);
};

const ajaxDelete = (url, callback) => {
    const request = new XMLHttpRequest();

    request.open('DELETE', url, false);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function () {
        if (request.readyState === 4 || request.status === 200) {
            callback(request.response);
        }
    };
    request.send(url);
};

if (JSON.parse(localStorage.getItem('todolist'))) {
    todolist = JSON.parse(localStorage.getItem('todolist'));
    outputTodo();
}

document.getElementById('addTask').onclick = function () {
    let todoValue = document.getElementById('enterTask');
    if (!todoValue.value) {
        alert('Enter the task')
    } else {
        const temp = {};
        temp.task = todoValue.value;
        const todoParameters  = "task=" + temp.task;
        console.log(todoParameters);
        ajaxPost(todoUrl, todoParameters, (response) => {
            let responseTask = JSON.parse(response);
            todolist.push(responseTask);
            localStorage.setItem('todolist', JSON.stringify(todolist));
        });
        todoValue.value = '';
        outputTodo();
    }
};

function outputTodo() {
    let output = ``;
    for (let key in todolist) {
        output += renderTask(key);
    }
    if (output) document.getElementById('toDo').innerHTML = output;
}

function renderTask(key) {
    const deleteBtn = '<button class="delete-btn" onclick="deleteTask(this)">Delete</button>';
    const editBtn = '<button class="edit-btn" onclick="editTask(this)">Edit</button>';
    const checkbox = '<input type="checkbox" class="checkbox" onclick="doneTask(this)">';
    return `<div class="todoItem" data-id="${todolist[key].id}">
                <label class="item-text">${checkbox}${todolist[key].task}</label>${deleteBtn} ${editBtn}
            </div>`;
}

function doneTask(checkbox) {
    let labelCheckbox = checkbox.closest('.item-text');
    if (checkbox.checked) {
        labelCheckbox.classList.add('task-completed');
    } else {
        labelCheckbox.classList.remove("task-completed");
    }
}

function deleteTask(deleteButton) {
    const todoId = deleteButton.parentNode.getAttribute("data-id");
    const todoTask = document.querySelector(`[data-id="${todoId}"]`);
    ajaxDelete(todoUrl + "/" + todoId, response => {
        const id = parseInt(deleteButton.parentNode.getAttribute('data-id'));
        todolist = todolist.filter(task =>  task.id != id);
    });
    todoTask.parentNode.removeChild(todoTask);
    localStorage.setItem('todolist', JSON.stringify(todolist));
}

function editTask(editBtn) {
    let taskItem = editBtn.parentNode.getAttribute('data-id');
    for (let key in todolist) {
        if (todolist[key].id === taskItem) {
            todolist[key].task = prompt('Edit task', todolist[key].task);
        }
    }
    outputTodo();
}
