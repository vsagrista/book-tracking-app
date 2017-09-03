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

    handleUserInput = (event) => {
        event.persist();
        this.timeout = setTimeout(() => {
            this.searchInTheBooksApi(event.target.value)
        }, 500);
    }

    searchInTheBooksApi = (searchText, timeout) => {
        clearInterval(this.timeout);
        BooksAPI.search(searchText, 100).then((result) => {
            if (typeof result !== 'undefined' && !result.error)
                this.mapWithCurrentBooks(result);
                this.setState({ searchResults: result });
        });
    }

    mapWithCurrentBooks(result) {
        this.props.currentCollection.forEach((book)=>{
            result.map((foundBook, i) => {
                if(book.id === foundBook.id)
                    result[i].shelf = book.shelf; // the book is in our collection
            });
        });
        console.log(result[0]);
    }

    displaySuccessMessage = () => {
        let successMesage = document.getElementById('success-message');
        successMesage.classList.remove('success-animate hide');
        successMesage.className = 'success-animate';
    }

    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/'>Close</Link>
                    <div id='success-message' className="success-msg hide">
                        <i className="fa fa-check"></i>
                        {this.successMessage}
                    </div>
                    <div className='search-books-input-wrapper'>
                        <input onChange={this.handleUserInput} type='text' placeholder='Search by title or author' />
                    </div>
                </div>
                <div className='search-books-results'>
                    <BooksListing books={this.state.searchResults} onSuccess={this.displaySuccessMessage.bind(this)} updateShelfOnApi={this.props.updateShelfOnApi} />
                </div>
            </div>
        )
    }
}

export default SearchBook;