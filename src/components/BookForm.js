import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/reducers"; // Import async thunk

const BookForm = () => {
  const initialState = {
    author: "",
    country: "",
    language: "",
    link: "",
    pages: "",
    title: "",
    year: "",
  };
  const [book, setBook] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(book).every((ele) => ele !== "")) {
      dispatch(addBook(book));
      setBook(initialState);
    } else {
      alert("please enter all details");
    }
  };

  return (
    <div className="add-book-form-container">
      <h2>Add a book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <label>Title:</label>
        <input
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <label>Author:</label>
        <input
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
        />
        <label>Country:</label>
        <input
          name="country"
          value={book.country}
          onChange={handleChange}
          placeholder="Country"
        />
        <label>Language:</label>
        <input
          name="language"
          value={book.language}
          onChange={handleChange}
          placeholder="Language"
        />
        <label>Link:</label>
        <input
          name="link"
          value={book.link}
          onChange={handleChange}
          placeholder="Link"
        />
        <label>Pages:</label>

        <input
          name="pages"
          value={book.pages}
          onChange={handleChange}
          placeholder="Pages"
        />
        <label>Year:</label>
        <input
          name="year"
          value={book.year}
          onChange={handleChange}
          placeholder="Year"
        />
        <button type="submit" className="form-submit-button">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
