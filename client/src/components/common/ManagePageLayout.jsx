const ManagePageLayout = ({
  eyebrow = "Administration",
  title,
  description,
  searchValue,
  onSearch,
  searchPlaceholder,
  createLabel = "Create Quiz",
  onCreate,
  deleteAllLabel,
  onDeleteAll,
  hasItems,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  onScroll,
  children,
}) => {
  return (
    <div className="flex h-full flex-col">
      <header className="mb-6 mt-4 flex h-fit shrink-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <AppHeaderContent
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </header>

      <div className="mb-5 flex flex-col-reverse gap-4 border-b border-border/90 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full shrink-0 sm:w-72 md:w-96">
          <SearchInput
            value={searchValue}
            onChange={onSearch}
            placeholder={searchPlaceholder}
          />
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          {onCreate && (
            <Button
              variant="primary"
              fit
              onClick={onCreate}
              className="w-full sm:w-auto"
            >
              {createLabel}
            </Button>
          )}

          {hasItems && onDeleteAll && (
            <Button
              variant="danger"
              icon={Trash}
              fit
              onClick={onDeleteAll}
              className="w-full sm:w-auto"
            >
              {deleteAllLabel}
            </Button>
          )}
        </div>
      </div>

      {hasItems ? (
        <GlassScrollableList onScroll={onScroll}>
          {children}
        </GlassScrollableList>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            icon={emptyIcon}
            title={emptyTitle}
            description={emptyDescription}
          />
        </div>
      )}
    </div>
  );
};

export default ManagePageLayout;
