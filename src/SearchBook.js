import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksListing from './BooksListing';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {

    constructor() {
        super();
        this.timeout = null;
        this.state = {
            searchResults: []
        }
    }

    // waits until the user stops typing
    handleUserInput = (event) => {
        event.persist(); // lets the timeout do its thing
        this.timeout = setTimeout(() => {
            this.searchInTheBooksApi(event.target.value)
        }, 500);
    }

    searchInTheBooksApi = (searchText, timeout) => {
        clearInterval(this.timeout);
        BooksAPI.search(searchText, 100).then((result) => {
            if (typeof result !== 'undefined' && !result.error) {
                this.mapWithCurrentBooks(result);
                this.setState({ searchResults: result });
            }
        });
    }

    // search returned object doesn't know which books we have in our collection
    mapWithCurrentBooks(result) { 
        this.props.currentCollection.forEach((book)=>{
            result.map((foundBook, i) => {
                if(book.id === foundBook.id)
                    return result[i].shelf = book.shelf; // the book is in our collection
            });
        });
    }

    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/'>Close</Link>
                    <div className='search-books-input-wrapper'>
                        <input onChange={this.handleUserInput} type='text' placeholder='Search by title or author' />
                    </div>
                </div>
                <div className='search-books-results'>
                    <BooksListing books={this.state.searchResults} updateShelfOnApi={this.props.updateShelfOnApi} />
                </div>
            </div>
        )
    }
}

export default SearchBook;