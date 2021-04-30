import React from "react";
import { update } from "../BooksAPI";

function Book(props) {
  const { name, author, url, shelf, id, updateShelf, useIn } = props;

  // const setOptions = () => {
  //     const selectedOptions = [
  //         {text: 'Currently Reading', value: "currentlyReading"},
  //         {text: 'Want to Read', value: "wantToRead"},
  //         {text: 'Read', value: "read"}
  //     ];

  //     return(
  //         <select defaultValue={shelf}>
  //             <option value="move" disabled>Move to...</option>
  //             <option value="currentlyReading" >Currently Reading</option>
  //             <option value="wantToRead" >Want to Read</option>
  //             <option value="read" >Read</option>
  //             <option value="none">None</option>
  //         </select>
  //     )
  // }

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
        <div className="book-authors">{author}</div>
      </div>
    </li>
  );
}

export default Book;
