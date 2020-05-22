let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const testBook = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
const testBook2 = new Book(
  "Harry Potter and the Sorceror's Stone",
  "J.K Rowling",
  300,
  false
);
const testBook3 = new Book("Ender's Game", "Orson Scott Card", 380, false);

myLibrary.push(testBook);
myLibrary.push(testBook2);
myLibrary.push(testBook3);

function toggleReadButton(event) {
  const index = Number(event.target.parentNode.getAttribute("data-index"));
  myLibrary[index].toggleRead();
  render(myLibrary);
}

function createBook(book, index) {
  const bookCard = document.createElement("div");
  const removeBtn = document.createElement("button");
  const title = document.createElement("h1");
  const author = document.createElement("h2");
  const pages = document.createElement("p");
  const read = document.createElement("button");

  bookCard.classList.add("book");

  removeBtn.innerHTML = "&times";
  removeBtn.setAttribute("type", "button");
  removeBtn.classList.add("remove-button");
  removeBtn.addEventListener("click", removeBookButton);

  title.textContent = book.title;
  title.classList.add("book-title");

  author.textContent = book.author;
  author.classList.add("book-author");

  pages.textContent = `${book.pages} pages`;
  pages.classList.add("book-pages");

  read.setAttribute("type", "button");
  read.classList.add("read-button");
  if (book.read) {
    read.classList.add("read");
    read.textContent = "Read";
  } else {
    read.classList.add("not-read");
    read.textContent = "Not Read";
  }
  read.addEventListener("click", toggleReadButton);

  bookCard.setAttribute("data-index", index);
  bookCard.appendChild(removeBtn);
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(read);
  return bookCard;
}

function clearLibraryList(libraryList) {
  while (libraryList.hasChildNodes()) {
    libraryList.removeChild(libraryList.lastChild);
  }
}

function addBook(book) {
  myLibrary.push(book);
  render(myLibrary);
}

function removeBook(index) {
  myLibrary = myLibrary.filter((book, i) => i !== +index);
}

function removeBookButton(event) {
  removeBook(event.target.parentNode.getAttribute("data-index"));
  render(myLibrary);
}

function render(library) {
  const libraryList = document.querySelector("#library");
  clearLibraryList(libraryList);

  library.forEach((book, index) => {
    const bookCard = createBook(book, index);
    libraryList.append(bookCard);
  });
}

const addBookBtn = document.querySelector("#add-book");
const closeFormBtn = document.querySelector(".btn-close-form");
const addBookForm = document.querySelector("#add-book-form");

addBookBtn.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "block";
  addBookBtn.style.display = "none";
});

closeFormBtn.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  addBookBtn.style.display = "block";
});

addBookForm.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  newBook = new Book(title, author, pages, read);

  addBook(newBook);
  modal.style.display = "none";
  addBookBtn.style.display = "block";
});

render(myLibrary);
