import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import BooksListing from './BooksListing';
import SearchBook from './SearchBook';
import * as FlashMessages from './FlashMessages';

class BooksApp extends React.Component {

  constructor() {
    super();
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    this.getBooksFromApi();
  }

  getBooksFromApi = () => {
    BooksAPI.getAll().then((response) => {
      if (!response.error) {
        this.setState({ books: response });
      } else {
        console.log('some error');
      }
    })
  }

  updateShelfOnApi = (book, shelf) => {
    book.shelf = shelf; // update the state
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll();
    }).then(() => {
      this.getBooksFromApi();
      FlashMessages.showAlert('success');
    });
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <div className='app'>
            <div className='list-books'>
              <div className='list-books-title'>
                <h1>MyReads</h1>
              </div>
              <BooksListing shelf={'0'} books={this.state.books} updateShelfOnApi={this.updateShelfOnApi.bind(this)} />
              <BooksListing shelf={'1'} books={this.state.books} updateShelfOnApi={this.updateShelfOnApi.bind(this)} />
              <BooksListing shelf={'2'} books={this.state.books} updateShelfOnApi={this.updateShelfOnApi.bind(this)} />
              <div className='open-search'>
                <Link to='/search' >Add a book</Link>
              </div>
            </div>
          </div>
        )} />
        <Route exact path='/search' render={() => (
          <SearchBook updateShelfOnApi={this.updateShelfOnApi.bind(this)} currentCollection={this.state.books} />
        )} />
      </div>
    )
  }
}

export default BooksApp;

BooksApp.propTypes = {
  books: PropTypes.array,
  getBooksFromApi: PropTypes.func,
  updateShelfOnApi: PropTypes.func
};