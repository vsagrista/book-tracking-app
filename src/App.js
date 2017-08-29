import React from 'react';
import * as BooksAPI from './BooksAPI';
import BooksListing from './BooksListing';
import SearchBook from './SearchBook';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
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
      <div>
        <Route exact path='/' render={() => (
          <div className='app'>
                  <div className='list-books'>
                    <div className='list-books-title'>
                      <h1>MyReads</h1>
                    </div>
                    <div className='list-books-content'>
                      <BooksListing shelf={'currentlyReading'} books={this.state.books} changeBookShelf={this.changeBookShelf}/>
                      <BooksListing shelf={'wantToRead'} books={this.state.books} changeBookShelf={this.changeBookShelf}/>
                      <BooksListing shelf={'read'} books={this.state.books} changeBookShelf={this.changeBookShelf}/>        
                    </div>
                    <div className='open-search'>
                      <Link to='/search' >Add a book</Link>
                    </div>
                  </div>
            </div>
        )}/>   
        <Route exact path='/search' component={ SearchBook }/> 
      </div>
    )
  }
}

export default BooksApp;
