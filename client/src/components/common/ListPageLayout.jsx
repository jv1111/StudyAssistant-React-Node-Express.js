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
      className="mx-auto w-full max-w-(--content-max-width) px-(--page-padding) py-10"
    >
      <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            id={`${title.toLowerCase()}-title`}
            className="text-3xl font-bold tracking-tight text-foreground"
          >
            {title}
          </h1>

          <p className="mt-2 text-sm text-muted">{description}</p>
        </div>

        <SearchInput
          value={searchInput}
          onChange={onSearch}
          placeholder={searchPlaceholder}
        />
      </header>

      {children}
    </section>
  );
};

export default ListPageLayout;
