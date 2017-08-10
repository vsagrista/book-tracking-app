import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import AlreadyRead from './AlreadyRead';

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
  }

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      this.setState({books: response});
      // id
      // authors
      // title
      // shelf
      // "currentlyReading"
      // "wantToRead"
      // "read"
    })
  }

  filterByType = (shelf) => {
    this.state.books.filter((book) => book.shelf === shelf);
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <CurrentlyReading books={this.state.books.filter((book) => book.shelf === "currentlyReading")}/>
                <WantToRead />
                <AlreadyRead />
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp;
