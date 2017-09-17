import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BooksListing extends Component {

    constructor() {
        super();
        this.shelves = {
            'header': ['Currently reading', 'Want to read', 'Read'],
            'shelf': ['currentlyReading', 'wantToRead', 'read']
        }
    }

setBooksOrderedList = (books) => {
    return (
        <div className='bookshelf'>
            <h2 className={this.shelves.header[this.props.shelf]? 'bookshelf-title': ''}>{this.shelves.header[this.props.shelf]}</h2>
            <div className='bookshelf-books'>
                <ol className='books-grid'>
                    {
                        books.map((book) => (
                            <li key={book.id}>
                                <div className='book'>
                                    <div className='book-top'>
                                        <div className='book-cover' style={{
                                            width: 128, height: 193,
                                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                        }}></div>
                                        <div className='book-shelf-changer'>
                                            <select value={typeof book.shelf !== 'undefined' ? book.shelf : 'none'} onChange={(event) => { this.props.updateShelfOnApi(book, event.target.value) }}>
                                                <option value='none' disabled>Move to...</option>
                                                <option value='currentlyReading'>Currently Reading</option>
                                                <option value='wantToRead'>Want to Read</option>
                                                <option value='read'>Read</option>
                                                <option value='none'>None</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    );
}

prepareBookList = () => {
    // needs books sorted by shelf
    if (this.props.shelf) {
        return this.setBooksOrderedList(this.props.books.filter((book) => book.shelf === this.shelves.shelf[this.props.shelf]));
        // display all found books
    } else if (this.props.books) {
        return this.setBooksOrderedList(this.props.books);
    } else {
        return <div></div>;
    }
}

render() {
    return (
        <div>
            {this.prepareBookList()}
        </div>
    );
}
}

export default BooksListing;

BooksListing.propTypes = {
    setBooksOrderedList: PropTypes.func,
    prepareBookList: PropTypes.func
};