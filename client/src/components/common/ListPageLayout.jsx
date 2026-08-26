import SearchInput from "./SearchInput";

const ListPageLayout = ({
  title,
  description,
  searchInput,
  onSearch,
  searchPlaceholder,
  children,
}) => {
  return (
    <section
      aria-labelledby={`${title.toLowerCase()}-title`}
      className="w-full"
    >
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            id={`${title.toLowerCase()}-title`}
            className="text-3xl font-extrabold tracking-tight text-foreground"
          >
            {title}
          </h1>

          {description && (
            <p className="mt-1 text-sm font-medium text-muted">{description}</p>
          )}
        </div>

        <div className="w-full shrink-0 sm:w-72 md:w-80">
          <SearchInput
            value={searchInput}
            onChange={onSearch}
            placeholder={searchPlaceholder}
          />
        </div>
      </header>

      {children}
    </section>
  );
};

export default ListPageLayout;
