import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";

const ItemContainer = ({ children, search, title }) => {
    const [searchVal, setSearchVal] = useState();
    return (
        <div className="itemContainer">
            <div className="topDescription">
                <h2 className="text-fam-kavoon">{title}</h2>
                <div className="line"></div>
                {search && (
                    <div className="searchBox">
                        <Search className="searchIcon" />
                        <input type="text" name="search" placeholder="search" />
                    </div>
                )}
            </div>
            <div className="itemPanel">
                {children}
            </div>
        </div>
    );
}

export default ItemContainer;