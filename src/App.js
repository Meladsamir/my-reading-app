import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Search from './components/Search';
import Home from './components/Home';
import Loader from "./components/Loader";
import * as BooksAPI from './utills/BooksAPI';

class App extends Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    IsLoading: false
  }
  componentDidMount() {
    this.GetAllBooks();
  }

  GetAllBooks = () => {
    this.LoadingHandler(true);
    BooksAPI.getAll()
      .then((booksData) => {
        this.SortBooksIntoState(booksData);
            this.LoadingHandler(false);

      });
  }

  SortBooksIntoState = (books) => {
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');
    this.setState((currentState) => (
      {
        ...currentState,
        books: {
          currentlyReading: currentlyReading,
          wantToRead: wantToRead,
          read: read
        }
      }
    ));
  }

  ChangeShelf = (book, newShelf) => {
    this.LoadingHandler(true);
    BooksAPI.update(book.id, newShelf).then(res => {
      this.GetAllBooks();
    })
  }

  LoadingHandler = (isLoading) => {
    this.setState((currentState) => ({ ...currentState, IsLoading: isLoading }))
  }
  render() {
    if (this.state.IsLoading) {
      return <Loader />
    }
    const { currentlyReading, wantToRead, read } = this.state.books;

    return (
      <Fragment>
        <Router>
          <div className="App">
            <Route exact path='/' render={() => (
              <Home
                Books={this.state.books}
                ChangeShelf={this.ChangeShelf} />
            )} />

            <Route path='/search' render={() => (
              <Search
                myBooks={[...currentlyReading, ...read, ...wantToRead]}
                ChangeShelf={this.ChangeShelf}
              />
            )} />
          </div>
        </Router>
      </Fragment>
    );
  }
}
export default App;
