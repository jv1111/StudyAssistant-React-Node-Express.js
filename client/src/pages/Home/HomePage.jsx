import React, { useState } from "react";
import { SubjectsList, ItemContainer } from "../../components";
import "../../styles/items.css";

const HomePage = () => {

    const [searchVal, setSearchVal] = useState("");

    return (
        <div className="home-page container">
            <ItemContainer
                search={true}
                title={"Subjects"}
                setSearchVal={setSearchVal}
            >
                <SubjectsList searchVal={searchVal} />
            </ItemContainer>
        </div>
    );
}

export default HomePage;