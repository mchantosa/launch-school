/*
Attributes
  Title: Mythos
  Author: Stephen Fry

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Me Talk Pretty One Day
  Author: David Sedaris

Behavior:
  Get Description

-----------------------------
Attributes
 Title: Aunts aren't Gentlemen
 Author: PG Wodehouse

 Behavior:
   Get Description
*/
const books = [];
books.push(createBook("Mythos", "Stephen Fry"));
books.push(createBook("Me Talk Pretty One Day", "David Sedaris"));
books.push(createBook("Aunts aren't Gentlemen", "PG Wodehouse", true));
books[1].readBook();
books.forEach(book => console.log(book.getDescriotion()));

function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
    getDescriotion() {
      return `${this.title} was written by ${this.author}.` +
             `${(this.read) ? " I have read it" : "I haven't read it"}.`;
    },
    readBook() {this.read = true}
  };
}