import { Search } from "react-bootstrap-icons";
import searchDelay from "../../helper/searchDelay";

const ItemContainer = ({ children, search, title, setSearchVal }) => {
  const searchHandler = (event) => {
    searchDelay(setSearchVal, event.target.value);
  };

  const titleId = `${title.toLowerCase().replace(/\s+/g, "-")}-title`;

  return (
    <section className="item-container" aria-labelledby={titleId}>
      <header className="item-container-header">
        <div>
          <h2 id={titleId}>{title}</h2>
        </div>

        {search && (
          <div className="item-container-search">
            <Search aria-hidden="true" />

            <label htmlFor={`${titleId}-search`} className="visually-hidden">
              Search {title}
            </label>

            <input
              id={`${titleId}-search`}
              type="search"
              name="search"
              placeholder={`Search ${title}...`}
              onChange={searchHandler}
            />
          </div>
        )}
      </header>

      <div className="item-container-content">{children}</div>
    </section>
  );
};

export default ItemContainer;
