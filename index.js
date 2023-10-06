"use strict";
const inputAddTask = document.getElementById("InputAddTask");
const btnAddTask = document.getElementById("AddTask");
const listTask = document.getElementById("listTask");
const modal = document.getElementById('modual');
const ModalCancel = document.getElementById("Modual_cancel");
const ModalDelete = document.getElementById("Modual_delete");
const Alert = document.getElementById('alert');
const AlertDanger = document.getElementById('Alert');
let ListTask = [];
let editMode = false;
const handleAddTask = () => {
    const newObj = {
        id: ListTask.length,
        task: inputAddTask.value,
    };
    ListTask.push(newObj);
    renderUi(ListTask);
    inputAddTask.value = "";
};
btnAddTask.addEventListener("click", handleAddTask);
const renderUi = (newArr = []) => {
    listTask.innerHTML = "";
    newArr.forEach((item) => {
        let DivTask = document.createElement("div");
        DivTask.className = "task";
        let InputTask = document.createElement("input");
        InputTask.setAttribute("type", "text");
        InputTask.setAttribute("id", `${item.id}`);
        InputTask.setAttribute("readonly", "");
        InputTask.value = item.task;
        let btnEdit = document.createElement("button");
        btnEdit.setAttribute("class", "btn");
        btnEdit.setAttribute("id", `edit_${item.id}`);
        btnEdit.innerText = "edit";
        btnEdit.addEventListener("click", () => {
            handleEdit(item.id);
        });
        let btnDelete = document.createElement("button");
        btnDelete.setAttribute("class", "btn");
        btnDelete.setAttribute("id", `delete_${item.id}`);
        btnDelete.innerText = "delete";
        btnDelete.setAttribute('data-toggle', "modal");
        btnDelete.setAttribute('data-target', "#exampleModal");
        btnDelete.addEventListener("click", () => {
            // handleDelete(item.id)
            modal.classList.add('show');
            ModalDelete.addEventListener('click', () => {
                handleDelete(item.id);
                modal.classList.remove('show');
                modal.classList.add('hide');
                AlertDanger.classList.add("showAlert");
                setTimeout(() => {
                    AlertDanger.classList.remove("showAlert");
                }, 6000);
            });
            ModalCancel.addEventListener('click', () => {
                modal.classList.remove('show');
                modal.classList.add('hide');
            });
        });
        DivTask.appendChild(InputTask);
        DivTask.appendChild(btnEdit);
        DivTask.appendChild(btnDelete);
        listTask === null || listTask === void 0 ? void 0 : listTask.append(DivTask);
    });
};
const handleEdit = (id) => {
    let inp = document.getElementById(`${id}`);
    const btnEdit = document.getElementById(`edit_${id}`);
    if (editMode) {
        inp === null || inp === void 0 ? void 0 : inp.setAttribute("readonly", "");
        btnEdit.innerText = "edit";
        const index = ListTask.findIndex((item) => item.id === id);
        ListTask[index].task = inp.value;
        editMode = false;
    }
    else {
        inp === null || inp === void 0 ? void 0 : inp.removeAttribute("readonly");
        btnEdit.innerText = "save";
        editMode = true;
        btnEdit.addEventListener('click', () => {
            Alert.classList.add("showAlert");
        });
        setTimeout(() => {
            Alert.classList.remove("showAlert");
        }, 6000);
    }
};
const handleDelete = (id) => {
    const index = ListTask.findIndex((item) => item.id === id);
    if (index !== -1) {
        ListTask.splice(index, 1);
        renderUi(ListTask);
    }
};
renderUi(ListTask);
