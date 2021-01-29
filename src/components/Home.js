import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Shelf from './Shelf';

const Home = (props) => {
    const { currentlyReading, wantToRead, read } = props.Books;
    const ChangeShelf = props.ChangeShelf;
    return (
        <Fragment>
            <div className="list-books-title"><h1>MyReads</h1></div>

            {(currentlyReading.length > 0) && <Shelf ShelfName='Currently Reading' Books={currentlyReading} ChangeShelf={ChangeShelf} />}
            {(wantToRead.length > 0) && <Shelf ShelfName='Want To Read' Books={wantToRead} ChangeShelf={ChangeShelf} />}
            {(read.length > 0) && <Shelf ShelfName='Read' Books={read} ChangeShelf={ChangeShelf} />}

            <Link to="/search"><div className="open-search"><button>Add a book</button></div></Link>
        </Fragment>
    )
}
Home.propTypes = {
    Books: PropTypes.object.isRequired,
    ChangeShelf: PropTypes.func.isRequired
}
export default Home;