let form = document.querySelector("form");
let Save = document.querySelector("#Save");
let Name = document.querySelector("#name");
let phone = document.querySelector("#phone");
let email = document.querySelector("#email");
let myData = document.querySelector("table");
let mytbody = myData.childNodes[3];
let id = 0;
let tableContent = '';
let data = [{}];
let isUpdate = false;
form.addEventListener("submit", function(e){
    e.preventDefault();
    acceptData()
    if (btnSave.value == "Update"){
        isUpdate = true
    }
})


function acceptData() {
    data.push({
      name: Name.value,
      phone: phone.value,
      email: email.value,
    });
  
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    addData()
};

let addData = () => {
    mytbody.innerHTML = "";
    data.map((data, index) => {
      return (mytbody.innerHTML += `
        <tr id=${index}>
            <td>${id+=1}</td> 
            <td>${data.name}</td>
            <td>${data.phone}</td>
            <td>${data.email}</td>
            <td>${new Date().toUTCString()}</td>
            <td>
                <button class="btn btn-success" onclick="editData(this)">Edit</button>
                <button class="btn btn-danger" onclick="deleteConfirmation(this)">Delete</button>
            </td>
        </tr>
      `);
    });
  
    resetForm();
};

function deleteData(button){
    button.parentElement.parentElement.remove();
    data.splice(button.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
}
function editData(button){
    let selectedData = button.parentElement.parentElement;
    Name.value = selectedData.children[1].innerHTML;
    phone.value = selectedData.children[2].innerHTML;
    email.value = selectedData.children[3].innerHTML;

    btnSave.value = "Update";
    deleteData(button)
}
function resetForm(){
    Name.value = "";
    phone.value = "";
    email.value = "";
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    addData();
})();

function deleteConfirmation(button){
    let isDelete = confirm("Are you sure to delete?");
    if (isDelete){
       deleteData(button)
    }
}