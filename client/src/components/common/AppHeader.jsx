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
        <div className="flex w-full shrink-0 items-center justify-end gap-2 sm:w-auto">
          {hasSearch && (
            <div className="w-full sm:w-72 md:w-80">
              <SearchInput
                value={searchValue}
                onChange={onSearch}
                placeholder={searchPlaceholder}
              />
            </div>
          )}

          {showBackButton && (
            <Button
              variant="secondary"
              iconOnly
              onClick={onBack}
              icon={ArrowLeft}
              title="Go back"
              className="h-10 w-10 shrink-0 rounded-input border border-border bg-surface text-foreground shadow-xs transition-transform hover:scale-105"
            />
          )}
        </div>
      )}
    </header>
  );
};

export default AppHeader;
