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

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        console.log("will receive", this.props)
    }

    shouldComponentUpdate(nextProps) {
        console.log("updated", nextProps)
        return true;
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
                this.setState({ searchResults: result });
        });
    }

    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/' >Close</Link>
                    <div className='search-books-input-wrapper'>
                        <input onChange={this.handleUserInput} type='text' placeholder='Search by title or author' />
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