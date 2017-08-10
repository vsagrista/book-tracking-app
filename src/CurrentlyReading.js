import React, { Component } from 'react';


class CurrentlyReading extends Component {
    render() {
        console.log(this.props.books);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books
                            .map((book) => (
                                book.shelf === "currentlyReading" ? (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{
                                                    width: 128, height: 193,
                                                    backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                                }}></div>
                                                <div className="book-shelf-changer">
                                                    <select>
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
                                ) : (
                                        <div class="container">
                                            <div class="banner">
                                                <h1>LOADING</h1>
                                                <div class="banner-left"></div>
                                                <div class="banner-right"></div>
                                            </div>
                                        </div>
                                    )
                            ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default CurrentlyReading;
