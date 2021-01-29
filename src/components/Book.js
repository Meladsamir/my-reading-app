import React from 'react'
import PropTypes from 'prop-types';


const Book = (props) => {
  const book = props.Book;
  const ChangeShelf = props.ChangeShelf;
  const shelves = ['none', 'read', 'currentlyReading', 'wantToRead'];
  const shelf = book.shelf === undefined ? 'none' : book.shelf;

  if (book.imageLinks.thumbnail === undefined) {
    return <h4> loading</h4>;
  }

  return (
    <div className="book">
      <img src={book.imageLinks.thumbnail} alt="Img" />
      <h4>{book.title}</h4>
      <p><i className="fas fa-highlighter"></i>{book.authors[0]}</p>
      <div className="select-contaner" >
        <select className="select-button"
          onChange={(event) => ChangeShelf(book, event.target.value)}
          value={shelf}>
          <option value="move" disabled>Move to...</option>
          {shelves.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
    </div>
  )
}

Book.propTypes = {
  Book: PropTypes.object.isRequired,
  ChangeShelf: PropTypes.func.isRequired
}
export default Book;

