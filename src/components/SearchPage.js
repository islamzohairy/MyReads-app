import React from "react";
import { search } from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      invalid: "",
      result: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.booksIdArr !== prevProps.booksIdArr) {
    //   let newResult = this.state.result.filter(
    //     (obj) => this.props.booksIdArr.indexOf(obj.id) === -1
    //   );

    //   this.setState({
    //     ...this.state,
    //     result: [...newResult],
    //   });
    // }

    if (this.state.query !== prevState.query) {
      this.changeHandler(this.state.query);
    }
  }

  searchReqHandler(value) {
    search(value)
      .then((res) => {
        let arr = [];
        if ("error" in res) {
          this.setState({
            ...this.state,
            invalid: value,
            result: [],
          });
        } else {
          let newRes = res.map((obj) => {
            this.props.booksArr.forEach((element) => {
              if (element.id === obj.id) {
                obj.shelf = element.shelf;
              }
            });
            if ("shelf" in obj === false) {
              obj.shelf = "none";
            }
            return obj;
          });
          arr = [...newRes];

          this.setState({
            ...this.state,
            result: [...arr],
            invalid: "",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async changeHandler(value) {
    if (
      this.state.invalid.length > 0 &&
      value.includes(this.state.invalid) &&
      value.length > this.state.invalid.length
    ) {
      console.log("invalid: ", this.state.invalid);
      this.setState({
        ...this.state,
        result: [],
      });
    } else if (value.length > 0) {
      this.searchReqHandler(value);
    }
  }

  queryHandler(event) {
    this.setState({
      ...this.state,
      query: event.target.value,
    });
  }

  render() {
    const { updateShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
            <input
              onChange={(event) => this.queryHandler(event)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query &&
              this.state.result.map((obj) => {
                return obj.imageLinks ? (
                  <Book
                    shelf={obj.shelf}
                    key={obj.id}
                    name={obj.title}
                    author={obj.authors}
                    url={obj.imageLinks.thumbnail}
                    id={obj.id}
                    updateShelf={updateShelf}
                  />
                ) : (
                  <Book
                    shelf={obj.shelf}
                    key={obj.id}
                    name={obj.title}
                    author={obj.authors}
                    id={obj.id}
                    updateShelf={updateShelf}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
