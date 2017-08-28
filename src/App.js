import React from 'react';
import * as BooksAPI from './BooksAPI';
import BooksListing from './BooksListing'
import './App.css';

class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      if(response)
        this.setState({books: response});  
    })
  }

  changeBookShelf = (bookToUpdate) => {
    this.state.books.forEach((book) => {
      if(book.id === bookToUpdate.id)
        this.setState({book: bookToUpdate});
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
                <BooksListing shelf={"currentlyReading"} books={this.state.books} changeBookShelf={this.changeBookShelf}/>
                <BooksListing shelf={"wantToRead"} books={this.state.books} changeBookShelf={this.changeBookShelf}/>
                <BooksListing shelf={"read"} books={this.state.books} changeBookShelf={this.changeBookShelf}/>        
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
