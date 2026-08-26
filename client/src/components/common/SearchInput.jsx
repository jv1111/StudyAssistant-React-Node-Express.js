import { Search } from "react-bootstrap-icons";

const SearchInput = ({
  id = "search",
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative w-full">
      <Search
        aria-hidden="true"
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
      />

      <input
        id={id}
        type="search"
        name="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="input-base py-2.5 pl-10 pr-4"
      />
    </div>
  );
};

export default SearchInput;
