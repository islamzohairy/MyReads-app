import React from "react";
import Book from "./Book";

function Bookshelf(props) {
  const { books, title, updateShelf } = props;
  const setBooks = () => {
    const result = books.map((obj) => (
      <Book
        key={obj.id}
        name={obj.title}
        author={obj.authors}
        url={obj.imageLinks.thumbnail}
        shelf={obj.shelf}
        id={obj.id}
        updateShelf={updateShelf}
      />
    ));
    return result.length > 0 ? result : <li>No books in this section</li>;
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{setBooks()}</ol>
      </div>
    </div>
  );
}

export default Bookshelf;
