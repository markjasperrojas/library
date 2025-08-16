function Book(name, author, pages, status) {
  if (!new.target) {
    throw Error("Please don't forget the 'new'");
  }

  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.info = function () {
    return (
      "The " +
      this.name +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      this.status
    );
  };
}
