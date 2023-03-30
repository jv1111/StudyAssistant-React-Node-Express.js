import React, { useState } from "react";
import { SubjectsList, ItemContainer } from "../../components";
import "../../styles/items.css";

const HomePage = () => {

    return (
        <div className="home-page container">
            <SubjectsList />
        </div>
    );
}

export default HomePage;