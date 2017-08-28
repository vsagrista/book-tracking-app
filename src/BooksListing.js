import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class BooksListing extends Component {

    updateShelfOnApi = (book, shelf) => {
        book.shelf = shelf;
        BooksAPI.update(book, shelf).then(()=>{
            this.props.sortBooksByShelf();
        });
    }

    render() {
        let bookList;
        bookList = (
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
                                            <select value={book.shelf} onChange={(event)=> {this.updateShelfOnApi(book, event.target.value)}}>
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
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    {bookList}
                </div>
            </div>
            );
    }
}

export default BooksListing;