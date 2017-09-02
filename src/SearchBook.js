import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksListing from './BooksListing';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {

    constructor() {
        super();
        this.timeout;
        this.state = {
            searchResults: []
        }
    }

    searchBookOnApi = (event) => {
        event.persist();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            BooksAPI.search(event.target.value, 100).then((result) => {
                if (typeof result !== 'undefined' && !result.error)
                    this.setState({ searchResults: result })
            });
        }, 500);
    }

    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/' >Close</Link>
                    <div className='search-books-input-wrapper'>
                        <input onChange={this.searchBookOnApi} type='text' placeholder='Search by title or author' />
                    </div>
                </div>
                <div className='search-books-results'>
                    <BooksListing books={this.state.searchResults} />
                </div>
            </div>
        )
    }
}

export default SearchBook;