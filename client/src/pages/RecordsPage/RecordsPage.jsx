import React, { useState } from "react";
import { RecordsList, ItemContainer } from "../../components";
import "../../styles/items.css";

const RecordsPage = () => {
    const [searchVal, setSearchVal] = useState("");

    return (
        <div className="recordsPage container">
            <ItemContainer
                search={true}
                title={"Records"}
                setSearchVal={setSearchVal}
            >
                <RecordsList searchVal={searchVal} />
            </ItemContainer>
        </div>
    );
}

export default RecordsPage;