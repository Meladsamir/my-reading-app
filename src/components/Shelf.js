import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = (props) => {
	const shelfName = props.ShelfName;
	const books = props.Books;
	const ChangeShelf = props.ChangeShelf;

	return (
		<div>
			<div className="shelf">
				<div className="innerdiv">
					<h3>{shelfName}</h3>
					<div className="divgroup">
						{(books.length > 0) && (books.map((book, key) => (
							<Book key={key} ChangeShelf={ChangeShelf} Book={book} />))
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
Shelf.propTypes = {
	ShelfName: PropTypes.string.isRequired,
	Books: PropTypes.array.isRequired,
	ChangeShelf: PropTypes.func.isRequired
}
export default Shelf;