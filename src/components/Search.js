import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from "../utills/BooksAPI";
import PropTypes from 'prop-types';
import Loader from './Loader';
import Shelf from './Shelf';

class Search extends Component {
    state = {
        books: [],
        isLoading: false,
    }

    ChangeInputHandler = async (event) => {
        const queryVal = event.target.value;
        if (queryVal.trim() !== '') {
            await this.SearchByQuery(queryVal);
        }
    }

    SearchByQuery = async (queryVal) => {
        this.setState(() => ({ books: [], isLoading: true }))
        await BooksAPI.search(queryVal)
            .then((res) => {
                let result = res;
                if (result.error === undefined && result.length > 0) {
                    const myBooks = this.props.myBooks;
                    for (let i = 0; i < result.length; i++) {
                        for (let j = 0; j < myBooks.length; j++) {
                            if (result[i].id === myBooks[j].id) {
                                result[i].shelf = myBooks[j].shelf
                            }
                        }
                    }

                    this.setState((currentState) => ({...currentState, books: result, isLoading: false })
                    )
                }
                else {
                    this.setState((currentState) => ({...currentState, books: [], isLoading: false }))
                }
            });
    }
    render() {
        return (
                <Fragment>
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link to='/'><button className="close-search">Close</button></Link>
                            <div className="search-books-input-wrapper">
                                <input onChange={this.ChangeInputHandler} className="search-input" type="text" placeholder="Search by title or author" />
                            </div>
                        </div>
                        {
                            (this.state.isLoading) ? (<Loader />) : (
                                (this.state.books.length > 0) && <Shelf ShelfName='Results' Books={this.state.books} ChangeShelf={this.props.ChangeShelf} />)
                        }
                    </div>
                </Fragment>

        )
    }
}
Search.propTypes = {
    myBooks: PropTypes.array.isRequired,
    ChangeShelf: PropTypes.func
}
export default Search;