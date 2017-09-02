import React, { Component } from 'react';

class BooksListing extends Component {

    setBooksOrderedList = (books) => {
        return (
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
                                        <select value={book.shelf} onChange={ (event) => { this.props.updateShelfOnApi(book, event.target.value) } }>
                                            <option value='none' disabled>Move to...</option>
                                            <option value='currentlyReading'>Currently Reading</option>
                                            <option value='wantToRead'>Want to Read</option>
                                            <option value='read'>Read</option>
                                            <option value='none'>None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='book-title'>{book.title}</div>
                                {/*{book.authors.map((author) => (
                                        <div key={author} className='book-authors'>{author}</div>
                                    ))}*/}
                            </div>
                        </li>
                    ))
                }
            </ol>
        );
    }

    prepareBookList = () => {
        // needs books sorted by shelf
        if (this.props.shelf) {
            return this.setBooksOrderedList(this.props.books.filter((book) => book.shelf === this.props.shelf));
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