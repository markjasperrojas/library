// const { randomUUID } = require("crypto"); // For Node.js

const myLibrary = [];

addBookToLibrary("Naruto Shippuden", "Masashi Kishimoto", 10210, "Completed");
addBookToLibrary("Demon Slayer", "Koyoharu Gotouge", 4496, "Reading");
addBookToLibrary("Solo Leveling", "Chu gong", 336, "Completed");

displayBooks(myLibrary);

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

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.getElementById("status").value;

  addBookToLibrary(title, author, pages, status);

  displayBooks(myLibrary);

  form.reset();
  modal.style.display = "none";
});

// class
function Book(title, author, pages, status) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
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

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

function displayBooks(myLibrary) {
  const tableBody = document.querySelector("#bookTable tbody");

  tableBody.innerHTML = "";

  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    const statusCell = document.createElement("td");

    const statusBtn = document.createElement("button");
    statusBtn.textContent = book.status;
    statusBtn.classList.add("special-button");

    // check the status and add a proper name class
    if (book.status === "Reading") {
      statusBtn.classList.add("reading");
    } else {
      statusBtn.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      deleteBook(book.id);
    };

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
    `;

    statusBtn.addEventListener("click", () => {
      if (statusBtn.classList.contains("reading")) {
        statusBtn.classList.remove("reading");
        statusBtn.classList.add("completed");
        statusBtn.textContent = "Completed";
        book.status = "Completed";
      } else {
        statusBtn.classList.remove("completed");
        statusBtn.classList.add("reading");
        statusBtn.textContent = "Reading";
        book.status = "Reading";
      }
    });

    statusCell.appendChild(statusBtn);
    row.appendChild(statusCell);
    row.appendChild(deleteBtn);
    tableBody.appendChild(row);
  });
}

function deleteBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  displayBooks(myLibrary);
}
