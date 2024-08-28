import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  books: [],
  loading: false,
  error: null,
};

// Async actions

// Aysnc action fetch books data
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ title,sortDir }) => {
    const response = await fetch(`http://64.227.142.191:8080/application-test-v1.1/books?title=${title}&DIR=${sortDir}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
);

// Aysnc action add a book data
export const addBook = createAsyncThunk(
  'books/addBook',
  async (book) => {
    const response = await fetch('http://64.227.142.191:8080/application-test-v1.1/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const newBook = await response.json();
    return newBook;
  }
);

// Aysnc action update book's data
export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, book }) => {
    const response = await fetch(`http://64.227.142.191:8080/application-test-v1.1/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const updatedBook = await response.json();
    return { id, book: updatedBook };
  }
);

// Slice
const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload.book;
        }
      });
  },
});

export default bookSlice.reducer;
