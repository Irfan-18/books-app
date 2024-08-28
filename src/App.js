import React from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import { Provider } from 'react-redux';
import store from './redux/store';
import BookForm from "./components/BookForm";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Irfan Tagala's Book Search Project</h1>
        <SearchBar />
        <BookList />
        <BookForm />
      </div>
    </Provider>
  );
}

export default App;
