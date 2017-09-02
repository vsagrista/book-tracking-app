import React from 'react';
import * as BooksAPI from './BooksAPI';
import BooksListing from './BooksListing';
import SearchBook from './SearchBook';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css';


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

  componentDidUpdate() {
    this.getBooksFromApi();
  }

  getBooksFromApi = () => {
    BooksAPI.getAll().then((response) => {
      if (response)
        this.setState({ books: response });
    })
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
              <div className='list-books-content'>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Currently Reading</h2>
                  <div className='bookshelf-books'>
                    <BooksListing shelf={ 'currentlyReading'} books={ this.state.books } />
                  </div>
                </div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Want to read</h2>
                  <div className='bookshelf-books'>
                    <BooksListing shelf={ 'wantToRead' } books={ this.state.books } />
                  </div>
                </div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Read</h2>
                  <div className='bookshelf-books'>
                    <BooksListing shelf={'read'} books={ this.state.books } />
                  </div>
                </div>
              </div>
              <div className='open-search'>
                <Link to='/search' >Add a book</Link>
              </div>
            </div>
            
          </div>
        )} />
        <Route exact path='/search' component={SearchBook} />
      </div>
    )
  }
}

export default BooksApp;
