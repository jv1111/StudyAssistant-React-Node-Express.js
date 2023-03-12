import React from "react";

const ItemContainer = ({ children, title }) => {
    return (
        <div className="itemContainer">
            <div className="topDescription">
                <h2>{title}</h2>
                <div className="line"></div>
            </div>
            <div className="itemPanel">
                {children}
            </div>
        </div>
    );
}

export default ItemContainer;