"use strict"
let bookTitle = document.getElementById("booktitle");
let bookAuthor = document.getElementById("bookauthor");
let bookPublisher = document.getElementById("bookpublisher");
let bookPrice = document.getElementById("bookprice");
let updbookTitle = document.getElementById("updbooktitle");
let updbookAuthor = document.getElementById("updbookauthor");
let updbookPublisher = document.getElementById("updbookpublisher");
let updbookPrice = document.getElementById("updbookprice");
let addBtn = document.getElementById("addbtn");
let tableBody = document.getElementById("table-body");

let bookContainer;

// create local storage 
if (localStorage.getItem("booklist") == null) {
    bookContainer = [];
}
else {
    bookContainer = JSON.parse(localStorage.getItem("booklist"));
    display();
}


// add new book function
addBtn.onclick = function addBook() {
    if (valid(bookTitle.value) == true && valid(bookAuthor.value) == true && valid(bookPublisher.value) == true && validPirce(bookPrice.value)) {
        let book = {
            title: bookTitle.value,
            author: bookAuthor.value,
            publisher: bookPublisher.value,
            price: bookPrice.value
        }
        bookContainer.push(book);
        localStorage.setItem("booklist", JSON.stringify(bookContainer));
        display();
        clearInputs();
        console.log(bookContainer);
    }
    else {
        alert("you should enter valid value");
    }
}

// clear Inputs function 
function clearInputs() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPublisher.value = "";
    bookPrice.value = "";
}

// display function
function display() {
    let cartona = '';
    for (let i = 0; i < bookContainer.length; i++) {

        cartona +=
            `<tr>
        <td>${i + 1}</td>
        <td>${bookContainer[i].title}</td>
        <td>${bookContainer[i].author}</td>
        <td>${bookContainer[i].publisher}</td>
        <td>${bookContainer[i].price}</td>
        <td>
            <button type="button" onclick="showDataToUpdate(${i})" class="" data-toggle="modal" data-target="#updatebook" id="updbook">
                <i class="fas fa-pen-alt text-warning fa-2x"></i>
            </button>
            <button type="button" onclick="getI(${i})" class=""  data-toggle="modal" data-target="#delbook" id="deltebook">
                <i class="fas fa-trash text-danger fa-2x"></i>
            </button>

        </td>
        </tr>`
    }
    tableBody.innerHTML = cartona;
}

// validation function
function valid(term) {
    let regx = /^[a-Z][a-z]{2,15}$/;
    if (regx.test(term) == true) {
        return true;
    }
    else {
        return false;
    }
}
function validPirce(num) {
    let regex = /^([1-9][0-9][0-9]|1000)$/;
    return regex.test(num);
}
// get value of index when click on delete btn and assign index to another btn when ensure delete
function getI(iter) {
    let delbttn = document.getElementById("dell-btn").value = iter;
}

// delete function
function delet(index) {
    bookContainer.splice(index, 1);
    localStorage.setItem("booklist", JSON.stringify(bookContainer));
    display();
    document.getElementById("delbook").style.display="none";
    document.querySelector(".modal-backdrop.show").style.display="none";

}
// update function (show data in fields to update)
function showDataToUpdate(iter) {
    updbookTitle.value = bookContainer[iter].title;
    updbookAuthor.value = bookContainer[iter].author;
    updbookPublisher.value = bookContainer[iter].publisher;
    updbookPrice.value = bookContainer[iter].price;
    document.getElementById("updd-btn").value = iter;
}
function update(index) {
    bookContainer[index].title = updbookTitle.value;
    bookContainer[index].author = updbookAuthor.value;
    bookContainer[index].publisher = updbookPublisher.value;
    bookContainer[index].price = updbookPrice.value;
    display();
}

//search function
function search(term) {
    let cartona = '';
    for (let i = 0; i < bookContainer.length; i++) {
        if (bookContainer[i].title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
           || bookContainer[i].author.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        ) {
            cartona += `<tr>
            <td>${i + 1}</td>
            <td>${bookContainer[i].title}</td>
            <td>${bookContainer[i].author}</td>
            <td>${bookContainer[i].publisher}</td>
            <td>${bookContainer[i].price}</td>
            <td>
                <button type="button" onclick="showDataToUpdate(${i})" class="" data-toggle="modal" data-target="#updatebook" id="updbook">
                    <i class="fas fa-pen-alt text-warning fa-2x"></i>
                </button>
                <button type="button" onclick="getI(${i})" class=""  data-toggle="modal" data-target="#delbook" id="deltebook">
                    <i class="fas fa-trash text-danger fa-2x"></i>
                </button>
            </td>
            </tr>`
        }
    }
    if(cartona == ''){
        tableBody.innerHTML="no results ";
    }
    else
    tableBody.innerHTML = cartona;
}