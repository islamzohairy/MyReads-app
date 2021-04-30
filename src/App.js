import React from "react";
import Bookshelf from "./components/Bookshelf";
import Header from "./components/Header";
import OpenButton from "./components/OpenButton";
import SearchPage from "./components/SearchPage";
import { getAll, update } from "./BooksAPI";

// import * as BooksAPI from './BooksAPI'
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  };

  async componentDidMount() {
    await getAll()
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          books: [...res],
        });
      })
      .catch((e) => console.log(e));
  }

  setCurrentlyReading() {
    return this.state.books.filter((obj) => obj.shelf === "currentlyReading");
  }

  setWantToRead() {
    return this.state.books.filter((obj) => obj.shelf === "wantToRead");
  }

  setRead() {
    return this.state.books.filter((obj) => obj.shelf === "read");
  }

  showSearchPageHandler() {
    this.setState({
      ...this.state,
      showSearchPage: true,
    });
  }

  backButtonHandler() {
    this.setState({
      ...this.state,
      showSearchPage: false,
    });
  }

  async updateShelf(id, shelf) {
    await update(id, shelf)
      .then(() => {
        const newBooks = this.state.books.map((obj) => {
          if (obj.id === id) {
            obj.shelf = shelf;
          }
          return obj;
        });

        this.setState({
          ...this.state,
          books: [...newBooks],
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage
            booksIdArr={this.state.books.map((obj) => obj.id)}
            handler={this.backButtonHandler.bind(this)}
            updateShelf={this.updateShelf.bind(this)}
          />
        ) : (
          <div className="list-books">
            <Header />

            <div className="list-books-content">
              {/* <div> */}
              <Bookshelf
                title={"Currently Reading"}
                books={this.setCurrentlyReading()}
                updateShelf={this.updateShelf.bind(this)}
              />
              <Bookshelf
                title={"Want to Read"}
                books={this.setWantToRead()}
                updateShelf={this.updateShelf.bind(this)}
              />
              <Bookshelf
                title={"Read"}
                books={this.setRead()}
                updateShelf={this.updateShelf.bind(this)}
              />
              {/* </div> */}
            </div>

            <OpenButton handler={this.showSearchPageHandler.bind(this)} />
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
