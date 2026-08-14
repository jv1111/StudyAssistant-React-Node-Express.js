import React from "react";
import { Search } from "react-bootstrap-icons";

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="input-group" style={{ maxWidth: "350px" }}>
      <span className="input-group-text bg-dark border-secondary text-secondary">
        <Search />
      </span>

      <input
        type="text"
        name="search"
        className="form-control bg-dark text-white border-secondary"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
