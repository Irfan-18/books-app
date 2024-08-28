import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BookList = () => {
  const [sortDirection, setSortDirection] = useState("ASC");
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [sortedBooks, setSortedBooks] = useState([]);

  const sortBooks = (booksArray, direction) => {
    let copiedBookArray = [...booksArray];
    // returning sorted books array based on title and ASC/DESC
    return copiedBookArray.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return direction === "ASC" ? -1 : 1;
      if (titleA > titleB) return direction === "ASC" ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    //setting books when either sort direction or books data changes
    setSortedBooks(sortBooks(books, sortDirection));
  }, [books, sortDirection]);

  //getting the logic for displaying current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedBooks.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="book-list-container">
      <div className="filter-container">
        <h2>Books List:</h2>
        <div>
          <h2 style={{ display: "inline" }}>sort: </h2>
          <select
            className="sort-books-filter"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
      </div>
      <div className="book-item-container">
        {currentBooks.length > 0
          ? currentBooks?.map((book) => (
              <div key={book.id} className="book-item">
                <h2>Title: {book.title}</h2>
                <p>Author: {book.author}</p>
              </div>
            ))
          : "No items to display"}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookList;
