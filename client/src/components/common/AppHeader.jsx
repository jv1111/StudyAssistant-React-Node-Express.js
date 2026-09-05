import { ArrowLeft } from "react-bootstrap-icons";
import AppHeaderContent from "./AppHeaderContent";
import SearchInput from "./SearchInput";
import Button from "./Button";

const AppHeader = ({
  eyebrow,
  title,
  description,
  leading,
  showBackButton = false,
  onBack,
  searchValue,
  onSearch,
  searchPlaceholder,
}) => {
  const hasSearch = searchValue !== undefined && onSearch;

  return (
    <header className="app-header flex justify-between gap-4">
      <div className="flex items-end gap-3">
        {leading}

        <AppHeaderContent
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </div>

      {(hasSearch || showBackButton) && (
        <div className="flex w-full shrink-0 flex-col items-end gap-2 sm:w-72 md:w-80">
          {showBackButton && (
            <Button
              variant="secondary"
              fit
              onClick={onBack}
              icon={ArrowLeft}
              className="gap-2" /* Applies spacing without editing Button.jsx */
            >
              Go Back
            </Button>
          )}

          {hasSearch && (
            <div className="w-full">
              <SearchInput
                value={searchValue}
                onChange={onSearch}
                placeholder={searchPlaceholder}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default AppHeader;
