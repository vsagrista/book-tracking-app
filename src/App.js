import React from 'react';
import * as BooksAPI from './BooksAPI';
import BooksListing from './BooksListing'
import './App.css';

class BooksApp extends React.Component {
  
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    showSearchPage: false,
  }

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      if(response) {
        this.setState({books: response});
        this.sortBooksByShelf();
      }    
      // id
      // authors
      // title
      // shelf
      // "currentlyReading"
      // "wantToRead"
      // "read"
    })
  }

  sortBooksByShelf = () => {
    this.setState({
      currentlyReading:  this.filterByType("currentlyReading"),
      wantToRead: this.filterByType("wantToRead"),
      read: this.filterByType("read")
    })
  }

  filterByType = (shelf) => {
      return this.state.books.filter((book) => {
        return book.shelf === shelf
      });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
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
                <BooksListing books={this.state.currentlyReading} sortBooksByShelf={this.sortBooksByShelf}/>
                <BooksListing books={this.state.wantToRead} sortBooksByShelf={this.sortBooksByShelf} />
                <BooksListing books={this.state.read} sortBooksByShelf={this.sortBooksByShelf}/>
                
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
