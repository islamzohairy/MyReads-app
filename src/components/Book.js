import React from "react";

function Book(props) {
  const { name, author, url, shelf, id, updateShelf, useIn } = props;

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={(event) => updateShelf(id, event.target.value)}
              defaultValue={shelf}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              {useIn !== "search" && <option value="none">None</option>}
            </select>
          </div>
        </div>
        <div className="book-title">{name}</div>
        <div className="book-authors">
          {author.map((str, index) => (
            <div key={"author" + id + index}>{str}</div>
          ))}
        </div>
      </div>
    </li>
  );
}

export default Book;
