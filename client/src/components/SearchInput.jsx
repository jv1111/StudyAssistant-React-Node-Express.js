import { Search } from "react-bootstrap-icons";

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="search-input">
      <Search aria-hidden="true" />

      <input
        type="search"
        name="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Search subjects"
      />
    </div>
  );
};

export default SearchInput;
