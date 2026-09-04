import AppHeaderContent from "./AppHeaderContent";
import SearchInput from "./SearchInput";

const AppHeader = ({
  eyebrow,
  title,
  description,
  leading,
  searchValue,
  onSearch,
  searchPlaceholder,
}) => {
  const hasSearch = searchValue !== undefined && onSearch;

  return (
    <header className="app-header">
      <div className="flex items-end gap-3">
        {leading}

        <AppHeaderContent
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </div>

      {hasSearch && (
        <div className="w-full shrink-0 sm:w-72 md:w-80">
          <SearchInput
            value={searchValue}
            onChange={onSearch}
            placeholder={searchPlaceholder}
          />
        </div>
      )}
    </header>
  );
};

export default AppHeader;
