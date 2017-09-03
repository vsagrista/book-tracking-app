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
    // document.getElementById('root').appendChild(this.successMessageHtml());
  }

  getBooksFromApi = () => {
    BooksAPI.getAll().then((response) => {
      if (!response.error) {
        this.setState({ books: response });
      } else {
        console.log('something happened');
      }
    })
  }

  updateShelfOnApi = (book, shelf) => {
    book.shelf = shelf; // update the state
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll();
    }).then(() => {
      this.getBooksFromApi();
      this.showAlert('success');
    });
  }

  showAlert = (type) => {
    switch (type) {
      case 'success':
        document.getElementById('root').appendChild(this.successMessageHtml());
        this.fadeInAndOut('success-message', 'success-animate');
      break;
      default:
        return;
    }
  }


  fadeInAndOut = () => {
    let alertMessage = document.getElementById('success-message');
    alertMessage.classList.remove('success-animate');
    alertMessage.className = 'success-animate';
    setTimeout(() => {
      alertMessage.classList.remove('success-animate');
      alertMessage.className = 'hide';
    }, 2000);
  }

  successMessageHtml = () => {
      var successMessage = document.createElement('div');
      successMessage.className = 'hide';
      successMessage.id = 'success-message';
      successMessage.innerHTML = '<i className="fa fa-check"></i>Success!'
      return successMessage;
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
                    <BooksListing shelf={'currentlyReading'} books={this.state.books} updateShelfOnApi={this.updateShelfOnApi.bind(this)} />
                  </div>
                </div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Want to read</h2>
                  <div className='bookshelf-books'>
                    <BooksListing shelf={'wantToRead'} books={this.state.books} updateShelfOnApi={this.updateShelfOnApi.bind(this)} />
                  </div>
                </div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Read</h2>
                  <div className='bookshelf-books'>
                    <BooksListing shelf={'read'} books={this.state.books} updateShelfOnApi={this.updateShelfOnApi.bind(this)} />
                  </div>
                </div>
              </div>
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
