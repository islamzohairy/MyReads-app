import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Not found!</h2>
      <div className="bookshelf-books" />
      <Link to="/">
        <button className="close-search">Close</button> back to home
      </Link>
    </div>
  );
}

export default NotFound;
