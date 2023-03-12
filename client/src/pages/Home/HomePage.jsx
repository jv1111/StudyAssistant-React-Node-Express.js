import React from "react";
import { SubjectsList, ItemContainer } from "../../components";
import "../../styles/items.css";

const HomePage = () => {
    return (
        <div className="home-page container">
            <ItemContainer title={"Subjects"}>
                <SubjectsList />
            </ItemContainer>
        </div>
    );
}

export default HomePage;