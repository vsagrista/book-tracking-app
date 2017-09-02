import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksListing from './BooksListing';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {

    state = {
        searchResults: []
    }

    searchBookInTheApi = (event) => {
        BooksAPI.search(event.target.value, 100).then((result) => {
            //console.log(result)
            this.setState({ searchResults: result })
        })
    }

    changeBookShelf = (bookToUpdate) => {
        this.state.books.forEach((book) => {
            if (book.id === bookToUpdate.id)
                this.setState({ book: bookToUpdate });
        });
    }

    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/' >Close</Link>
                    <div className='search-books-input-wrapper'>
                        <input onChange={this.searchBookInTheApi} type='text' placeholder='Search by title or author' />
                    </div>
                </div>
                <div className='search-books-results'>
                    {this.state.searchResults.length > 0 ?
                        <BooksListing books={this.state.searchResults} changeBookShelf={this.changeBookShelf} />
                        :
                        <div>Loading</div>
                    }
                </div>
            </div>
        )
    }
}

export default SearchBook;