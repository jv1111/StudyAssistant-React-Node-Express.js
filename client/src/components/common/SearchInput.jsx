import { Search } from "react-bootstrap-icons";

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        aria-hidden="true"
        size={16}
        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted"
      />

      <input
        type="search"
        name="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Search subjects"
        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted outline-none backdrop-blur-xl transition-all duration-200 focus:border-primary/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-primary/10"
      />
    </div>
  );
};

export default SearchInput;
