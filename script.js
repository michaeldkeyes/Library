let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
}

function addBookToLibrary() {

}

const testBook = new Book("The Hobbit", "J.R.R Tolkien", 295);

myLibrary.push(testBook);

function render() {
  myLibrary.forEach(book => console.log(book.info()));
}

render();