import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";
import autoSearch from "../helper/autoSearch";

const ItemContainer = ({ children, search, title, setSearchVal }) => {

    const searchHandler = (e) => {
        autoSearch(setSearchVal, e.target.value);
    }

    return (
        <div className="itemContainer">
            <div className="topDescription">
                <h2 className="text-fam-kavoon">{title}</h2>
                <div className="line"></div>
                {search && (
                    <div className="searchBox">
                        <Search className="searchIcon" />
                        <input
                            type="text"
                            name="search"
                            placeholder="search"
                            onChange={searchHandler}
                        />
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