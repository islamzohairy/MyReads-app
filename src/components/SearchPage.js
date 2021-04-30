import React from "react";
import { search, update } from "../BooksAPI";
import Book from "./Book";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
  }

  async changeHandler(event) {
    await search(event.target.value)
      .then((res) => {
        let arr = [];
        if (!res.error) {
          console.log(this.props.booksIdArr);
          let newRes = res.filter((obj) => {
            let index = this.props.booksIdArr.indexOf(obj.id);
            console.log(index);
            if (index === -1) {
              return obj;
            }
          });
          arr = [...newRes];
        }
        console.log(res);
        this.setState({
          result: [...arr],
        });
      })
      .catch((e) => console.log(e));
  }

  async addHandler(id, shelf) {
    await update(id, shelf)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  }

  render() {
    const { handler, updateShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => handler()}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
            <input
              onChange={(event) => this.changeHandler(event)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.result.map((obj) => {
              if (obj.imageLinks) {
                return (
                  <Book
                    key={obj.id}
                    name={obj.title}
                    author={obj.authors}
                    url={obj.imageLinks.thumbnail}
                    id={obj.id}
                    updateShelf={updateShelf}
                    useIn="search"
                  />
                );
              }
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
