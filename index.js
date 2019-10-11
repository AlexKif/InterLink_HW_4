let todolist = [];
let count = 0;

if (JSON.parse(localStorage.getItem('todolist'))) {
    todolist = JSON.parse(localStorage.getItem('todolist'));
    count = JSON.parse(localStorage.getItem('itemCount'));
    outputTodo();
}

document.getElementById('addTask').onclick = function () {
    count++;
    let todoValue = document.getElementById('enterTask');
    const temp = {};
    temp.id = count;
    temp.task = todoValue.value;
    todolist.push(temp);
    todoValue.value = '';
    outputTodo();
    localStorage.setItem('todolist', JSON.stringify(todolist));
    localStorage.setItem('itemCount', JSON.stringify(count));
};

function outputTodo() {
    let output = '';
    const deleteBtn = '<button class="delete-btn" onclick="deleteTask(this)">Delete</button>';
    const editBtn = '<button class="edit-btn" onclick="editTask()">Edit</button>';
    const checkbox = '<input type="checkbox" class="checkbox" onclick="doneTask(this)">';
    for (let key in todolist) {
        output += '<div class="todoItem" data-id='+ todolist[key].id +'><label class="item-text">' + checkbox +todolist[key].task + '</label>'+ deleteBtn + editBtn +  '</div>'
}
    document.getElementById('toDo').innerHTML = output;
}

function doneTask(checkbox) {
    let labelCheckbox = checkbox.closest('.item-text');
    if (checkbox.checked) {
        labelCheckbox.classList.add('taskCompleted');
        // localStorage.setItem('done',);
    } else {
        labelCheckbox.classList.remove("taskCompleted");
    }
}

function deleteTask(index) {
    const id = parseInt(index.parentNode.getAttribute('data-id'));
    todolist.map((item, key) => {
        if (item.id === id) {
            const item = document.querySelector(`[data-id="${id}"]`);
            item.parentNode.removeChild(item);
            delete todolist[key];
        }
    });
    todolist = todolist.filter(Boolean);
    localStorage.setItem('todolist', JSON.stringify(todolist))
}

function editTask(test) {
    let x = test.parentNode;
}
