import React, { useState } from "react";
import { SubjectsList, ItemContainer } from "../../components";
import "../../styles/items.css";

const HomePage = () => {

    return (
        <div className=" page homePage selectionPage container">
            <SubjectsList />
        </div>
    );
}

export default HomePage;