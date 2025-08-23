// const { randomUUID } = require("crypto"); // For Node.js
// randomUUID() only not crypto.randomUUID() if running with Node.js

const myLibrary = [];

const modal = document.getElementById("bookModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const form = document.getElementById("bookForm");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addBookToLibrary(myLibrary);

  displayBooks(myLibrary);

  form.reset();
  modal.style.display = "none";
});

function Book(id, title, author, pages, status) {
  if (!new.target) {
    throw Error("Please don't forget the 'new'");
  }

  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.info = function () {
    return (
      "The " +
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      this.status
    );
  };
}

function displayBooks(myLibrary) {
  const tableBody = document.querySelector("#bookTable tbody");

  tableBody.innerHTML = "";

  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.status}</td>
      `;
    tableBody.appendChild(row);
  });
}

function addBookToLibrary(myLibrary) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.getElementById("status").value;

  myLibrary.push(new Book(crypto.randomUUID(), title, author, pages, status));
}
