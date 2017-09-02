import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class BooksListing extends Component {

    constructor() {
        super();
        this.bookList = [];
    }

    updateShelfOnApi = (book, shelf) => {
        book.shelf = shelf;
        BooksAPI.update(book, shelf).then(() => {
            this.props.changeBookShelf(book);
        });
    }

    render() {

        const prepareBookList = () => {
            if(this.props.shelf){
                return this.props.books.filter((book) => book.shelf === this.props.shelf)
            } else if (this.props.books) {
                return this.props.books
            } else {
                return null;
            }
        }

        this.bookList = prepareBookList();

        return (
                <ol className='books-grid'>
                    {                
                        this.bookList.map((book) => (
                            <li key={book.id}>
                                <div className='book'>
                                    <div className='book-top'>
                                        <div className='book-cover' style={{
                                            width: 128, height: 193,
                                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                        }}></div>
                                        <div className='book-shelf-changer'>
                                            <select value={book.shelf} onChange={(event)=> {this.updateShelfOnApi(book, event.target.value)}}>
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
}

export default BooksListing;