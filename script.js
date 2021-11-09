const container = document.querySelector('#container');
const addBtn = document.querySelector('#add');
const modal = document.querySelector('#add-Modal');
const closeModal = document.querySelector('#close');
const form = document.querySelector('#myForm');
const submitBtn = document.querySelector('#submit');

let myLibrary = [];

if(!localStorage.getItem('books')){
  populateStorage();
} else {
  loadLibrary();
}

class Book{
  constructor(author, title, pages, read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
  
  get author(){
    return this.author;
  }

  get title(){
    return this.title;
  }

  get pages(){
    return this.pages;
  }

  get read(){
    return this.read;
  }

}

function addBookToLibrary(book) {
  myLibrary.push(book)
}


addBtn.addEventListener('click', () => {
  modal.style.display = "block";
});

closeModal.addEventListener('click', closeForm);

function displayBooks(){
  container.innerHTML = "";
  for(i=0; i<myLibrary.length; i++){
    bookCard = document.createElement('div');
    bookCard.classList.add('card');
    bookCard.innerHTML = myLibrary[i].author + '<br />' + myLibrary[i].title 
    + '<br />' + myLibrary[i].pages + " pages" + '<br />' + "Read?: " + myLibrary[i].read
    + '<br />' + '<br />';

    delBtns = document.createElement('button');
    readBtns = document.createElement('button');
    delBtns.dataset.index = i;
    readBtns.dataset.index = i;
    delBtns.textContent = 'Delete';
    readBtns.textContent = 'Read';

    delBtns.addEventListener('click', removeBook);

    readBtns.addEventListener('click', readBook);

    bookCard.appendChild(delBtns);
    bookCard.appendChild(readBtns);
    container.appendChild(bookCard);
  }
}

function removeBook(e){
  myLibrary.splice(e.target.dataset.index, 1);
  populateStorage();
  displayBooks();
}

function readBook(e){
  console.log(e.target);
  if(myLibrary[e.target.dataset.index].read){
    myLibrary[e.target.dataset.index].read = false;
  } else {
    myLibrary[e.target.dataset.index].read = true;
  }

  populateStorage();
  displayBooks();
}

submitBtn.addEventListener('click', handleForm);

function handleForm(e){
  let newAuthor = document.getElementById("newAuthor").value;
  let newTitle = document.getElementById("newTitle").value;
  let newPages = document.getElementById("newPages").value;
  let newRead = document.getElementById("newRead");
  let readStatus = "";
  if(newRead.checked){
    readStatus = true;
  } else{
    readStatus = false;
  }

  if(newAuthor === "" || newTitle === "" || newPages === ""){
    e.preventDefault();
  } else{
    let newBook = new Book(newAuthor, newTitle, newPages, readStatus);
    addBookToLibrary(newBook);
    displayBooks();
  }

  populateStorage();
  closeForm();
}

function closeForm(){
  modal.style.display = "none";
  form.reset();
}

function loadLibrary(){
  let currentLibrary = JSON.parse(localStorage.getItem('books'));
  myLibrary = currentLibrary;
}

function populateStorage(){
  localStorage.setItem('books', JSON.stringify(myLibrary));

  loadLibrary();
}

displayBooks();