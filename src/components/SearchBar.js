import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../redux/reducers"; // Import async thunk

const SearchBar = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  // function to handle search click
  const handleSearch = () => {
    if (title !== "") {
      dispatch(fetchBooks({ title }));
    } else {
      alert("Please Enter Title!!");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search for books by title"
        style={{ width: "100%" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: 0, margin: 0, border: "none",background:'#00B4CC' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100%"
          height="100%"
          viewBox="0 0 50 50"
        >
          <path d="M 7 4 C 5.35 4 4 5.35 4 7 L 4 43 C 4 44.65 5.35 46 7 46 L 43 46 C 44.65 46 46 44.65 46 43 L 46 7 C 46 5.35 44.65 4 43 4 L 7 4 z M 22.5 13 C 27.74 13 32 17.26 32 22.5 C 32 24.76 31.210625 26.840703 29.890625 28.470703 L 37.710938 36.289062 L 36.289062 37.710938 L 28.470703 29.890625 C 26.840703 31.210625 24.76 32 22.5 32 C 17.26 32 13 27.74 13 22.5 C 13 17.26 17.26 13 22.5 13 z M 22.5 15 A 7.5 7.5 0 0 0 15 22.5 A 7.5 7.5 0 0 0 22.5 30 A 7.5 7.5 0 0 0 30 22.5 A 7.5 7.5 0 0 0 22.5 15 z"></path>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
