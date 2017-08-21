import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class WantToRead extends Component {
    updateBookStatus = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.props.sortBooksByStatus();
        });
    }
    render() {
        let wantToRead;
        if (this.props.books) {
            wantToRead = (
                <ol className="books-grid">
                    {
                        this.props.books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{
                                            width: 128, height: 193,
                                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                        }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(event)=> {this.updateBookStatus(book, event.target.value)}}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    {book.authors.map((author) => (
                                        <div key={author} className="book-authors">{author}</div>
                                    ))}
                                </div>
                            </li>
                        ))
                    }
                </ol>
            )
        } else {
            wantToRead = (
                <div className="container">
                    <div className="banner">
                        LOADING
                        <div className="banner-left"></div>
                        <div className="banner-right"></div>
                    </div>
                </div>
            )
        }
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                    {wantToRead}
                </div>
            </div>
        )
    }
}

export default WantToRead;